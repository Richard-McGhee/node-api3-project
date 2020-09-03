const express = require('express')
const helmet = require('helmet')
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const server = express()

server.use(express.json())
server.use(helmet())
server.use(logger)
server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)

server.get("/", (req, res) => {
    if(req){
        res.status(200).json({ greeting: "Hello from Satan's Server" })
    } else{
        res.status(500).json({ errorMessage: "Somehow something went wrong" })
    }
})

// Custom Middleware

function logger(req, res, next){
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get("origin")}`)
    next()
}

const port = 666
server.listen(port, () => {
    console.log(`Server Up! Listening on Satan's port: ${port}`)
})