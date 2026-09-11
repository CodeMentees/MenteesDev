import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/userModel.js";

/*
|--------------------------------------------------------------------------
| GOOGLE
|--------------------------------------------------------------------------
*/

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();

        let user = await User.findOne({
          $or: [
            { googleId: profile.id },
            ...(email ? [{ email }] : []),
          ],
        });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName || "Google User",
            email,
            password: null,
            isVerified: true,
          });
        } else {
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

/*
|--------------------------------------------------------------------------
| GITHUB
|--------------------------------------------------------------------------
*/

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,

      // Needed for private email access
      scope: ["user:email"],
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();

        if (!email) {
          return done(
            new Error(
              "GitHub did not return an email address. Please make sure the user:email scope is enabled."
            ),
            false
          );
        }

        let user = await User.findOne({
          $or: [
            { githubId: profile.id },
            { email },
          ],
        });

        if (!user) {
          user = await User.create({
            githubId: profile.id,
            name:
              profile.displayName ||
              profile.username ||
              "GitHub User",
            email,
            password: null,
            isVerified: true,
          });
        } else {
          if (!user.githubId) {
            user.githubId = profile.id;
          }

          if (!user.isVerified) {
            user.isVerified = true;
          }

          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

/*
|--------------------------------------------------------------------------
| PASSPORT SESSION SUPPORT
|--------------------------------------------------------------------------
*/

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;