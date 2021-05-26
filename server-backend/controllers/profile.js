const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js')
const Verification = require('../models/Verification')
const Admin = require('../models/Admin.js')
const auth = require('../middleware/auth.js')

const getProfile = async (req, res) => {

    const id = req.body;
    console.log(id)

    try {
        if(!id )
        return res.status(400).json({message: "Please Log in First."})

        const user = User.findOne({ id })

        if(!user) return res.status(404).json({ message: "User doesn't exist."});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.status(200).json({ result: user, token })
        
    } catch (error) {
        console.log(error);
    }

}

const updateProfile = async (req, res) => {
    const { id, name, email, password, phoneNumber, country, state, avatar } = req.body;
    //console.log(req.body);

    const profileData = {};
    if(name) profileData.name = name;
    if(email) profileData.email = email;
    if(password) {
        const hashedPassword = await bcrypt.hash(password, 12)
        return profileData.password = hashedPassword; }
    if(phoneNumber) profileData.phoneNumber = phoneNumber;
    if(country) profileData.country = country;
    if(state) profileData.state = state;
    if(avatar) profileData.avatar = avatar;

    const user = await User.findOneAndUpdate({ _id: id }, { $set: profileData }, { new: true })

    if(!user) return res.status(404).json({ message: "Internal Server Error"});

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "1h" })

    return res.status(200).json({ result: user, token, message: 'Your Profile Updated Successfully.' });

}

const verifyProfile = async (req, res) => {
    const { file1, file2, file3, userId } = req.body;

    try {
        if (!file1 || !file2 ||!file3|| !userId ) {
            return res.status(400).json({message: 'Please fill all required feild'})
        }
        const post = await Verification.find({ userId: userId })
        console.log(post);
        if (post.length) {
            const verifyAgain = await Verification.findOneAndUpdate({ userId: userId }, { file1, file2, file3, isSolved: false, $inc: { attempt: 1 }, updatedAt: new Date() }, { new: true })
            return res.status(200).json({ verifyAgain, message: 'We have recived your response again, we will notify you through email.' });
        }

        const verify = await Verification.create({ userId, file1, file2, file3, attempt: 1, createdAt: new Date()});
        const admin = await Admin.findOneAndUpdate({ _id: "60aa628a829ead2cf45bfa0f" }, { $inc: { pendingVerifiedUser: 1 }}, { new: true })
        res.status(200).json({ verify, message: 'We have recived your response, we will notify you through email.' });


    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProfile, updateProfile, verifyProfile}