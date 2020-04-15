const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const nodemailer = require("nodemailer")
const User = require("./model/User")

const app = express()

const port = process.env.PORT || 8002

dotenv.config()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("DB connected"))


// send mail to user
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
    }
})




app.get("/", (req, res) => {
    res.send("response from server");
})

app.post("/user-form", async (req, res) => {
    try {
        const user = new User(req.body)
        const savedUser = await user.save()
        if (savedUser) {
            const mailoptions = {
                from: process.env.MAIL,
                to: savedUser.email,
                subject: 'Algofocus Task Mail by SHIVANSHU GUPTA',
                text: `You have fill up following details Name :- ${savedUser.name} ,  DOB :- ${savedUser.dob} `
            }

            transporter.sendMail(mailoptions, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Mail send: " + info.response)
                }
            })
            res.status(200).send("ok")
        } else {
            res.status(400).send("Error")
        }
    } catch (err) {
        res.status(400).send("Error")
    }
})

app.get("/users", async (req, res) => {
    try {
        const user = await User.find({})
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(400).send("Error")
        }
    } catch (err) {
        res.status(400).send("Error")
    }
})

app.listen(port, () => console.log(`app running on port ${port}`))