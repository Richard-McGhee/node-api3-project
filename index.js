const express = require('express')
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const server = express()

server.use(express.json())
server.use(logger)
server.use("/api/user", userRouter)
server.use("/api/post", postRouter)

server.get("/", (req, res) => {
    if(req){
        res.status(200).json({ greeting: "Hello from Satan's Server" })
    } else{
        res.status(500).json({ errorMessage: "Somehow something went wrong" })
    }
})

// Custom Middlewares

function logger(req, res, next){
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get("Origin")}`)
    next()
}

const port = 666
server.listen(port, () => {
    console.log(`Server Up! Listening on Satan's port: ${port}`)
})