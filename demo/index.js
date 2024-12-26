const express = require("express")

const fs = require("fs")

const users = require('./MOCK_DATA.json')
const { log } = require("console")

const app = express()

const PORT = 4000

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)

})

app.post('/api/users', (req, res) => {
    const body = req.body;
    console.log(body);

    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "succesful", id: users.length })
    })
})

app.listen(PORT, () => console.log(`Server started with port ${PORT}`))
