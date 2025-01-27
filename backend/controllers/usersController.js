import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

//create user
const createUser = asyncHandler(async (req, res) => {
   try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const createdUser = await user.save();
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.remove();
            res.json({ message: 'User removed' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

//get user
const getUser = asyncHandler(async (req, res) => {
  try { 
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

//update user
const updateUser = asyncHandler(async (req, res) => {
    try { 
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

//get users
const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

export { createUser, deleteUser, getUser, getUsers, updateUser };