const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js')
const auth = require('../middleware/auth.js');


const mailjet = require ('node-mailjet')
.connect('6d599b08fcc04ddcdaede7a9f0c880d9', '9da3014d83bce0f52a4f363a37e52f38', {
    url: 'api.mailjet.com', // default is the API url
    version: 'v3.1', // default is '/v3'
    perform_api_call: true // used for tests. default is true
  })


  // Forget Password Route

  const forgetpassword = async (req, res) => {
  
    const { email } = req.body;
    //console.log(email);
    try {

        if(!email )
        return res.status(400).send({message: "Please fill all the required feild."})

        const existingUser = await User.findOne({ email })

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."});

        const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_RESET_KEY, { expiresIn: "1h" });

        existingUser.resetToken = token
        existingUser.expireToken = Date.now() + 3600000
        existingUser.save()

           // Confirmation Email sent
   const request = mailjet.post("send").request({
    "Messages":[
      {
        "From": {
          "Email": "pay2sajib@gmail.com",
          "Name": "Abu"
        },
        "To": [
          {
            "Email": email,
            "Name": existingUser.name
          }
        ],
        "Subject": "Lift-Buddy - Reset your password",
        "TextPart": "Change Password",
        "HTMLPart": `<h3 align="center" style="color:red;">Here is your reset password link.<br /> 
                     Simply click <a href="${process.env.CLIENT_URL}/reset-password/${token}">here</a> </h3>
                     <br /> <h3 align="center">Or copy the link down below and paste it on your browser.</h3>
                     <br /> <h3>${process.env.CLIENT_URL}/reset-password/${token}</h3>
                     <br /> <button align="center" style="color:blue;" ><a href="${process.env.CLIENT_URL}/reset-password/${token}">Activate Your Account</a></button>
                     <br />May the delivery force be with you!`,
        "CustomID": "AppGettingStartedTest"
      }
    ]
  })
  request
    .then((result) => {
      res.status(200).json({message: 'A email is on your way, Make sure you follow the instrauction.'})
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
        
    } catch (error) {
        console.log(error);
    }
  }

  // Reset New Password Route

  const resetpassword = async (req, res) => {

    const { token, password } = req.body;
    //console.log(token);
    //console.log(password);

    try {
      const rightUser = await User.findOne({resetToken:token, expireToken:{$gt:Date.now()}})
      if(!rightUser){ return res.status(422).json({message:"Session expired. Try again from forget password."}) }
          const hashedPassword = await bcrypt.hash(password, 12);
              rightUser.password = hashedPassword
              rightUser.resetToken = undefined
              rightUser.expireToken = undefined
              rightUser.save()
        res.status(200).json({message: 'Password Changed Successfully. Plase Log In.'})
    } catch (error) {
        console.log(error);
    }
  
}

module.exports = { forgetpassword, resetpassword }