import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";
import asyncHandler from "express-async-handler";

const client = new OAuth2Client();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for user authentication and management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               credential:
 *                 type: string
 *               client_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or invalid data
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, credential, client_id } = req.body;
  let user;

  if (credential) {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = await User.create({ email, name: `${given_name} ${family_name}` });
  } else {
    user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    user = await User.create({ name, email, password });
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
    message: "User registered successfully",
  });
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate user and return token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               credential:
 *                 type: string
 *               client_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Invalid email or password
 *       404:
 *         description: User not found
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password, credential, client_id } = req.body;

  let user;
  if (credential) {
    const ticket = await client.verifyIdToken({ idToken: credential, audience: client_id });
    const payload = ticket.getPayload();
    user = await User.findOne({ email: payload.email });
  } else {
    user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "User not Signed Up" });
    }
  }

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.cookie("token", generateToken(user), { maxAge: 86400000, httpOnly: true })
    .json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
      message: "User signed in successfully",
    });
});

/**
 * @swagger
 * /api/users/google/callback:
 *   get:
 *     summary: Google OAuth callback endpoint
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Google callback successful
 */
export const googleCallback = asyncHandler(async (req, res) => {
  res.json({ message: "Google callback successful" });
});

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout user and clear jwt cookie
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
export const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
