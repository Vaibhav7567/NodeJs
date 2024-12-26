const express = require("express")

const users = require("./MOCK_DATA.json")

const app = express()

const fs = require("fs")
const { json } = require("stream/consumers")

const PORT = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/api/users', (req, res) => {
    return res.json(users)
})

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)
        return res.json(user)

    }).patch((req, res) => {
        const id = Number(req.params.id)
        const userIndex = users.findIndex((user) => user.id === id)

        const updatedUser = { ...users[userIndex], ...req.body }
        users[userIndex] = updatedUser;

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: "completed", user: updatedUser })
        })



    }).delete((req, res) => {
        const id = Number(req.params.id)
        const updatedUsers = users.filter((user) => user.id !== id);

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(updatedUsers), (err, data) => {
            return res.json({ status: "Completed" })
        })

    })

app.post('/api/users', (req, res) => {
    const body = req.body;
    console.log(body);

    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "Successful", id: users.length })
    })
})


app.listen(PORT, () => console.log(`Server started at ${PORT}`))