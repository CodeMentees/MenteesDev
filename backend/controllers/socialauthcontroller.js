import crypto from "crypto";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { getDefaultPermissions } from "../utils/defaultPermissions.js";

/*
|--------------------------------------------------------------------------
| Helper: Create application login cookie
|--------------------------------------------------------------------------
*/

const loginUserAndRedirect = (res, user) => {
  const token = generateToken(user, "1d");

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  const frontendUrl =
    process.env.FRONTEND_URL || "http://localhost:5173";

  return res.redirect(frontendUrl);
};

/*
|--------------------------------------------------------------------------
| GITHUB CALLBACK
|--------------------------------------------------------------------------
*/

export const githubCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=github_login_failed`
      );
    }

    return loginUserAndRedirect(res, req.user);
  } catch (error) {
    console.error("GitHub callback error:", error);

    const frontendUrl =
      process.env.FRONTEND_URL || "http://localhost:5173";

    return res.redirect(
      `${frontendUrl}/login?error=github_login_failed`
    );
  }
};

/*
|--------------------------------------------------------------------------
| LINKEDIN START
|--------------------------------------------------------------------------
*/

export const linkedinLogin = (req, res) => {
  const state = crypto.randomBytes(32).toString("hex");

  res.cookie("linkedin_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  });

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
    state,
    scope: "openid profile email",
  });

  const authUrl =
    `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;

  res.redirect(authUrl);
};

/*
|--------------------------------------------------------------------------
| LINKEDIN CALLBACK
|--------------------------------------------------------------------------
*/

export const linkedinCallback = async (req, res) => {
  const frontendUrl =
    process.env.FRONTEND_URL || "http://localhost:5173";

  try {
    const { code, state } = req.query;

    const savedState = req.cookies.linkedin_oauth_state;

    // Clear state cookie
    res.clearCookie("linkedin_oauth_state");

    if (!code) {
      return res.redirect(
        `${frontendUrl}/login?error=linkedin_no_code`
      );
    }

    if (!state || !savedState || state !== savedState) {
      return res.redirect(
        `${frontendUrl}/login?error=linkedin_invalid_state`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Exchange authorization code for access token
    |--------------------------------------------------------------------------
    */

    const tokenBody = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
    });

    const tokenResponse = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: tokenBody.toString(),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error(
        "LinkedIn token error:",
        tokenData
      );

      return res.redirect(
        `${frontendUrl}/login?error=linkedin_token_failed`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Get LinkedIn user information
    |--------------------------------------------------------------------------
    */

    const userInfoResponse = await fetch(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const profile = await userInfoResponse.json();

    if (!userInfoResponse.ok) {
      console.error(
        "LinkedIn userinfo error:",
        profile
      );

      return res.redirect(
        `${frontendUrl}/login?error=linkedin_profile_failed`
      );
    }

    const linkedinId = profile.sub;
    const email = profile.email?.toLowerCase();

    if (!linkedinId || !email) {
      return res.redirect(
        `${frontendUrl}/login?error=linkedin_missing_email`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Find existing account
    |--------------------------------------------------------------------------
    */

    let user = await User.findOne({
      $or: [
        { linkedinId },
        { email },
      ],
    });

    /*
    |--------------------------------------------------------------------------
    | Create new account
    |--------------------------------------------------------------------------
    */

    if (!user) {
      user = await User.create({
        linkedinId,
        name:
          profile.name ||
          `${profile.given_name || ""} ${profile.family_name || ""}`.trim() ||
          "LinkedIn User",
        email,
        password: null,
        isVerified: profile.email_verified !== false,
        permissions: getDefaultPermissions("student"),
        role: "student",
      });
    } else {
      /*
      |--------------------------------------------------------------------------
      | Existing account - attach LinkedIn ID
      |--------------------------------------------------------------------------
      */

      if (!user.linkedinId) {
        user.linkedinId = linkedinId;
      }

      if (!user.isVerified) {
        user.isVerified = true;
      }

      await user.save();
    }

    /*
    |--------------------------------------------------------------------------
    | Create your normal application session
    |--------------------------------------------------------------------------
    */

    return loginUserAndRedirect(res, user);
  } catch (error) {
    console.error("LinkedIn callback error:", error);

    return res.redirect(
      `${frontendUrl}/login?error=linkedin_login_failed`
    );
  }
};