const User = require('../models/user.js')
const Verification = require('../models/Verification')
const Report = require('../models/Report')
const Post = require('../models/postMessage')
const Admin = require('../models/Admin.js')
const Help = require('../models/Help.js')

const { MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC } = require('../config/keys.js')

const mailjet = require ('node-mailjet')
.connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE)


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
        const verify = await Verification.find({isSolved: false}).sort({createdAt: 1})

        res.status(200).json({ verify })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }

}

const adminDashboardVerificationResponse = async (req, res) => {
    const {verified, idType, idValue, userId, reject} = req.body;

    try {
        if (verified === "no" ) {
            const user = await User.find({_id: userId})
            const verify = await Verification.findOneAndUpdate({userId: userId}, { isSolved: true}, { new: true })
            const mail = user[0].email ;
            const name = user[0].name ;

               // Confirmation Email sent
   const request = mailjet.post("send").request({
    "Messages":[
      {
        "From": {
          "Email": "contact2sajib@gmail.com",
          "Name": "Abu"
        },
        "To": [
          {
            "Email": mail,
            "Name": name
          }
        ],
        "Subject": "Last Spot Bd - We couldn't verify your account.",
        "TextPart": "We couldn't verify your account.",
        "HTMLPart": `<h3 align="center" style="color:green;"> ${reject} </h3>
                     <br /> <h3 align="center">Please try again.</h3>
                     <br />Have a nice day!`,
        "CustomID": "AppGettingStartedTest"
      }
    ]
  })
  request.then((result) => { console.log(result.body)})
    .catch((err) => {
      console.log(err.statusCode)
      console.log(err)
    })

  res.status(200).json({message: 'A email is on his way, With the reason you provided.'})

        } else {
            const user = await User.find({_id: userId})
            const updateUser = await User.findByIdAndUpdate({_id: userId}, { isVerified: true }, { new: true })
            const mail = user[0].email ;
            console.log(mail)
            const name = user[0].name ;
            const verify = await Verification.findOneAndUpdate({userId: userId}, { isSolved: true, idType, idValue}, { new: true })
            const admin = await Admin.findOneAndUpdate({ _id: "60aa628a829ead2cf45bfa0f" }, { $inc: { verifiedUser: 1 }}, { new: true })

            const request = mailjet.post("send").request({
                "Messages":[
                  {
                    "From": {
                      "Email": "contact2sajib@gmail.com",
                      "Name": "Abu"
                    },
                    "To": [
                      {
                        "Email": mail,
                        "Name": name
                      }
                    ],
                    "Subject": "Last Spot Bd - Your account has been verified.",
                    "TextPart": "Your account has been verified.",
                    "HTMLPart": `<h3 align="center" style="color:green;"> You have successfully verified your accout. </h3>
                                 <br /> <h3 align="center">Now you can entaract with posts. And all the restriction has been removed.</h3>
                                 <br />Have a nice day!`,
                    "CustomID": "AppGettingStartedTest"
                  }
                ]
              })
              request.then((result) => { console.log(result.body)})
                .catch((err) => {
                  console.log(err.statusCode)
                  console.log(err)
                })

            res.status(200).json({ message: "Profile Verification Success email is on his way." })
        }


        console.log({verified, idType, idValue, userId, reject})

        
    } catch (error) {
        console.log(error);
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

const adminDashboardHelp = async (req, res) => {
        const { mail, message } = req.body;
  try {
      const help = await Help.create({ mail, message, createdAt: new Date()})
      const admin = await Admin.findOneAndUpdate({ _id: "60aa628a829ead2cf45bfa0f" }, { $inc: { totalHelp: 1 }}, { new: true })

      res.status(200).json({ message: 'We have recived your query. we will get back to you soon!' })
      
  } catch (error) {
      res.status(500).json({message: "Internal Server Error. Please, try again later!"})
  }

}

const adminDashboardHelpView = async (req, res) => {

  try {
      const help = await Help.find({isSolved: false}).sort({createdAt: 1})

      res.status(200).json({ help })
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: "Internal Server Error"})
  }

}

const adminDashboardHelpReply = async (req, res) => {
        const { id, replyMessage } = req.body;
  try {
      const help = await Help.findByIdAndUpdate({_id: id},{ replyMessage, isSolved: true, replayedAt: new Date() }, {new: true})
      console.log(help);
      const mail = help.mail;
      const msg = help.message;

      const request = mailjet.post("send").request({
        "Messages":[
          {
            "From": {
              "Email": "contact2sajib@gmail.com",
              "Name": "Abu"
            },
            "To": [
              {
                "Email": mail,
                "Name": "Mr/Mrs"
              }
            ],
            "Subject": "Last Spot Bd - Here is your answer.",
            "TextPart": "Your question has been answered.",
            "HTMLPart": `<h3 align="center" > Your question was: ${msg} </h3>
                         <br /> <h3 align="center" style="color:green;">Here is our response: ${replyMessage}</h3>
                         <br />Still Need help? Then reply in this mail.
                         <br />Have a nice day!`,
            "CustomID": "AppGettingStartedTest"
          }
        ]
      })
      request.then((result) => { console.log(result.body)})
        .catch((err) => {
          console.log(err.statusCode)
          console.log(err)
        })
    


      res.status(200).json({ message: "We have sent an email to the user with your response." })
      
  } catch (error) {
     // console.log(error);
      res.status(500).json({message: "Internal Server Error. Please, try again later."})
  }

}


module.exports = { adminDashboard, adminDashboardPost, adminDashboardUser, 
    adminDashboardVerification, adminDashboardReport, adminDashboardVerificationResponse,
    adminDashboardHelp, adminDashboardHelpView, adminDashboardHelpReply  }