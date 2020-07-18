require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const server = express()
const port = parseInt(process.env.API_PORT, 10)
server.use(express.json()) 

server.use(routes)
server.listen(port, () => {
   console.log(`Server is running at ${process.env.API_HOST}:${port}`)
})