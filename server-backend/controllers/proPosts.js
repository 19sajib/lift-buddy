const mongoose = require('mongoose')
const proPosts = require('../models/proPosts.js')

const createProPost = async (req, res) => {
    const post = req.body;
    console.log(post);
    console.log(req.body);

    const newPost = new proPosts({...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}

const readProPost = async (req, res) => {
    try {
        const posts = await proPosts.find()

        res.status(200).json({posts})
    } catch (error) {
       res.status(400).json({ message: error.message}) 
    }
}
const deleteProPost = async (req, res) => {

}

module.exports = { createProPost, readProPost, deleteProPost }