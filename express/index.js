const http = require("http")
const express = require("express")

const app = express();

app.get('/', (req, res) =>{
    return res.send("hello from home page")
})

app.get('/about', (req, res) =>{
    return res.send(`Hello ${req.query.myname}`)
})

app.post('/')

// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log("Server started"));


app.listen(8000, () => console.log("Server Started"))