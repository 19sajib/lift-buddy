const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const fetch = require("node-fetch");

const User = require('../models/user.js')
const Admin = require('../models/Admin.js')
const auth = require('../middleware/auth.js');

const { MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC } = require('../config/keys.js')


const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT)

const mailjet = require ('node-mailjet')
.connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE)


// Register & Get Confarmation Email

const signup = async (req, res) => {
   const { firstName, lastName, email, password, confirmPassword } = req.body;
   try {
   // Validation

   if(!firstName || !lastName || !email || !password || !confirmPassword )
   return res.status(400).send({ message: "Please fill all the required feild."});

   if(password.length < 8)
   return res.status(400).json({ message: "Please enter a password of at least 8 chracters."})
   
   if(password !== confirmPassword)
   return res.status(400).json({ message: "Please enter a same password twice."})
   
   const existingUser = await User.findOne({email: email})
   if(existingUser)
   return res.status(400).json({ message: "An account with this email already exists."})

   // generate jwt token
   const token = jwt.sign({ email, password, firstName, lastName }, process.env.JWT_SECRET, { expiresIn: "1h" });


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
            "Name": firstName
          }
        ],
        "Subject": "Lift-Buddy - Activate your account",
        "TextPart": "Activate Your Account",
        "HTMLPart": `<h3 align="center" style="color:red;">We just need to validate your email address to activate your account.<br /> 
                     Simply click <a href="${process.env.CLIENT_URL}/accountactivation/${token}">here</a> </h3>
                     <br /> <h3 align="center">Or copy the link down below and paste it on your browser.</h3>
                     <br /> <h3>${process.env.CLIENT_URL}/accountactivation/${token}</h3>
                     <br /> <button style="color:blue; align:center" ><a href="${process.env.CLIENT_URL}/accountactivation/${token}">Activate Your Account</a></button>
                     <br />May the delivery force be with you!`,
        "CustomID": "AppGettingStartedTest"
      }
    ]
  })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
      console.log(err)
    })

  res.status(200).json({message: 'A email is on your way, Make sure you follow the instrauction.'})

   } catch (error) {
    res.status(500).json({ message: 'Something went worng.'})
   }
}


// Account Activation & user Save to DB

const saveuser = async (req, res) => {

  const {token} = req.body //req.params;
  //console.log(token);

  try {
    jwt.verify(token, process.env.JWT_SECRET, async function(err, decodedToken) {
       if(err) {
         console.log(err);
        res.status(400).json({ message: 'Activition Link expired or Incorrect'})
       } else {
         const { email, password, firstName, lastName } = decodedToken;

         // hash the password

          const hashedPassword = await bcrypt.hash(password, 12);

        // save a new user account to the db

          const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

          //Admin Panel thing
          const admin = await Admin.findOneAndUpdate({ _id: process.env.Admin_Id }, { $inc: { user: 1 }}, { new: true })
          
        // send the token in a HTTP-only cookie
        //res.cookie("token", token, {httpOnly: false,secure: false}).send()

          // send result & token
          res.status(200).json({ message: 'Your Account Created Successfully. Make Sure Your Logged in to Continue Further.'})
       }
     })
   

} catch (error) {
  console.log(error);
}

}




// Log In/ Sign In

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // validate
        if(!email || !password )
        return res.status(400).json({message: "Please fill all the required feild."})


        const existingUser = await User.findOne({ email })

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."});
        if(existingUser?.isBanned) return res.status(403).json({ message: "We have banned your account. If you have any question contact us."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({ message: "Inavaild Credentials."});

        // Generate JWT token
        const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, { expiresIn: "1h" })

        // send the token in a HTTP-only cookie
            // res.cookie("token", token, {
            // httpOnly: false,
            // secure: false,  
            // })
            // res.status(200).json({result: existingUser, token})
        // send result & token    
         res.status(200).json({ result: existingUser, token, message: "Logged In successfully."})
    } catch (error) {
        res.status(500).json({ message: 'Something went worng.'})
    }
}

// Sign Out/ Log Out

const signout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    }).send();
}

const profile = async (req, auth, res) => {
    const { email } = req.body;

    const profile = await User.findOne({ email })

    console.log(profile);

    res.status(200).json({ result: profile})

}

const googleSignIn = async (req, res) => {
  const { token } = req.body;
  //console.log(token);


  await client.verifyIdToken({idToken:token, audience:process.env.GOOGLE_OAUTH_CLIENT})
                      .then((response) => {
                        const { email_verified, email, name, picture} = response.payload;
                        console.log(response.payload);
                          if (email_verified) {
                            User.findOne({email}).exec(async (err, user) => {
                              if (err) {
                                res.status(400).json({ message: 'Something went worng!'})
                              } else {
                                 if(user?.isBanned) return res.status(403).json({ message: "We have banned your account. If you have any question contact us."});
                                    if (user) {
                                      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "1h" })
                                      const { _id, email, name, avatar, isAdmin, isVerified } = user
                                      res.status(200).json({ result: user, token, message: "Logged In successfully."})
                                    } else {
                                      const password = email+process.env.JWT_PASSWORD_KEY;
                                      const hashedPassword = await bcrypt.hash(password, 12);

                                      const user = await User.create({ email, password: hashedPassword, name, avatar:picture});
                                      const admin = await Admin.findOneAndUpdate({ _id: process.env.Admin_Id }, { $inc: { user: 1 }}, { new: true })
                                      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "1h" })
                                      res.status(200).json({ result: user, token, message: "Account Created successfully & You Have been Logged In."})
                                      // const newUser = await new User({name, email, hashedPassword, avatar:picture })
                                      // newUser.save((err, data) => {
                                      //   if (err) {
                                      //     res.status(400).json({ message: 'something went worng.'})
                                      //   }
                                      //   console.log(data);
                                      //   const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET, { expiresIn: "1h" })
                                      //   const { _id, email, name, avatar } = newUser
                                      //   res.status(200).json({ result: {_id, name, email, avatar}, token})
                                      // })
                                      
                                    }
                              }
                            }
                            )
                          }
                        //console.log(response.payload)
                      })

}

const facebookSignIn = async (req, res) => {
  try {
    const {accessToken, userID} = req.body

    const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`
    
    await fetch(URL).then(res => res.json()).then( async (data) => {

      //console.log(data);

    const {email, name, picture} = data

    const user = await User.findOne({email})
    if(user?.isBanned) return res.status(403).json({ message: "We have banned your account. If you have any question contact us."});
    if (user) {
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "1h" })
      const { _id, email, name, avatar } = user
      res.status(200).json({ result: user, token, message: "Logged In successfully."})
    } else {
      const password = email+process.env.JWT_PASSWORD_KEY;
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({ email, password: hashedPassword, name, avatar:picture.data.url});
      const admin = await Admin.findOneAndUpdate({ _id: process.env.Admin_Id }, { $inc: { user: 1 }}, { new: true })
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "1h" })
      res.status(200).json({ result: user, token, message: "Account Created successfully & You Have been Logged In."})

    }

    })

    

  } catch (err) {
    return res.status(500).json({message: err.message})
}
}

module.exports = {signin, signup, signout, profile, saveuser, googleSignIn, facebookSignIn}