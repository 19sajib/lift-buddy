const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js')
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

module.exports = { getProfile, updateProfile}