const express = require("express")

const {logReqRes} = require("./middlewares/index")
const {connectMongoDB}= require("./connection")

const userRouter = require("./routes/user")


const app = express()
const PORT = 8000



// connection 
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=>console.log('mongo db started'));

// middleware
app.use(express.urlencoded({ extended: false }))

app.use(logReqRes("log.txt"))

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server started at ${PORT}`))