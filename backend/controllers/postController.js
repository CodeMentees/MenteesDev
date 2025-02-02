import Post from '../models/postModel.js';
import asyncHandler from 'express-async-handler';

//create post
const createPost = asyncHandler(async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            category: req.body.category
        });
        const createdPost = await post.save();
        res.status(201).json({
            data : createdPost,
            message :"Post created successfully"
        });
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
}
);

//delete post
const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            await post.deleteOne();
            res.json({ message: 'Post removed' });
        } else {
            res.status(404);
            throw new Error('Post not found');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

//get post
const getPost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            res.json(post);
        } else {
            res.status(404);
            throw new Error('Post not found');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

//update post

const updatePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            post.title = req.body.title || post.title;
            post.content = req.body.content || post.content;

            const updatedPost = await post.save();
            res.json(updatedPost);
        } else {
            res.status(404);
            throw new Error('Post not found');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
}
);

//get posts
const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({}).limit(10);
        res.json(posts);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

export { createPost, deletePost, getPost, getPosts, updatePost };