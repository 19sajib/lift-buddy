const User = require('../models/user.js')
const Verification = require('../models/Verification')
const Report = require('../models/Report')
const Post = require('../models/postMessage')
const Admin = require('../models/Admin.js')



const adminDashboard = async (req, res) => {

    try {

        const admin = await Admin.find()
        console.log(admin);
        res.status(200).json({admin})
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }

}

const adminDashboardPost = async (req, res) => {

    try {
        const post = await Post.find()

        res.status(200).json({ post})
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }

}

const adminDashboardUser = async (req, res) => {

    try {
        const users = await User.find()

        res.status(200).json({ users })
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }

}

const adminDashboardVerification = async (req, res) => {

    try {
        const verify = await Verification.find()

        res.status(200).json({ verify })
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }

}

const adminDashboardReport = async (req, res) => {

    try {
        const reports = await Report.find()

        res.status(200).json({ reports })
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }

}


module.exports = { adminDashboard, adminDashboardPost, adminDashboardUser, adminDashboardVerification, adminDashboardReport }