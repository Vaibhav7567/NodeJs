const express = require("express")

// const users = require("./MOCK_DATA.json")

const app = express()

const fs = require("fs")
const { json } = require("stream/consumers")

const mongoose = require("mongoose")

const PORT = 8000

// Schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    job_title: {
        type: String
    },

    gender: {
        type: String
    }

}, { timestamps: true })

const User = mongoose.model("User", userSchema)

// connection 
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => { console.log("Mongo Error", err) })


// middleware
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    console.log("I am middleware 1")

    // return res.json({msgs : "Hello from middleware 1"})
    next();
})

app.get('/api/users', async (req, res) => {
    const allDBusers = await User.find({})

    res.setHeader("X-myName", "Vaibhav")

    return res.json(allDBusers)
})

app.get('/users', async (req, res) => {

    const allDBusers = await User.find({})

    const html = `
    <ul>
        ${allDBusers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

app
    .route('/api/users/:id')
    .get(async (req, res) => {

        /* const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)*/
        const user = await User.findById(req.params.id)

        if (!user)
            return res.status(404).json({ erro: "User not found" })

        return res.json(user)

    }).patch((req, res) => {
        const id = Number(req.params.id)
        const userIndex = users.findIndex((user) => user.id === id)

        const updatedUser = { ...users[userIndex], ...req.body }
        users[userIndex] = updatedUser;

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: "completed", user: updatedUser })
        })



    }).delete(async(req, res) => {
        /* const id = Number(req.params.id)
        const updatedUsers = users.filter((user) => user.id !== id);

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(updatedUsers), (err, data) => {
            return res.json({ status: "Completed" })
        })
*/
        await User.findByIdAndDelete(req.params.id)
        return res.json({status:"Success"})
    })


/*
    app.post('/api/users', (req, res) => {
const body = req.body;
console.log(body);


if (!body || body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
    return res.status(400).json({msg:"All fields are required"})
}
users.push({ ...body, id: users.length + 1 });
fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    // return res.json({ status: "Successful", id: users.length })

    // for successfully creating a new entry
    return res.status(201).json({ status: "Successful", id: users.length })
})
})
*/
app.post('/api/users', async (req, res) => {
    const body = req.body;
    console.log(body);


    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All fields are required" })
    }
    const result = await User.create({

        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender,
    })
    console.log(result);

    return res.status(201).json({ msg: "Succes" })
})


app.listen(PORT, () => console.log(`Server started at ${PORT}`))