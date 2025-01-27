import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

const registerUser = async (req, res) => {
  const { name, email, password, credential, client_id } = req.body;

  try {
    if (credential) {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: client_id,
      });
      const payload = ticket.getPayload();
      const { email, given_name, family_name } = payload;
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exist!" });
      const user = await User.create({
        email: email,
        name: `${given_name} ${family_name}`,
      });

      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      };

      res.status(200).json({
        data: data,
        message: "User Sign Up  successfully",
      });
    } else {
      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      };

      if (user) {
        res.status(201).json({
          data: data,
          message: "User created successfully",
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const authUser = async (req, res) => {
  const { email, password, credential, client_id } = req.body;

  console.log(credential);

  try {
    if (credential) {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: client_id,
      });

      const payload = ticket.getPayload();
      const { email } = payload;
      const user = await User.findOne({ email: email });

      console.log(user);

      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      };

      if (user) {
        res.status(200).json({
          data: data,
          message: "User Sign In successfully",
        });
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    } else {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        const data = {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        };
        res.json({
          data: data,
          message: "User Sign In successfully",
        });
      } else {
        res.status(401);
        throw new Error("Invalid email or password");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const googleCallback = async (req, res) => {
  res.json({ message: "Google callback" });
};

export { registerUser, authUser, googleCallback };
