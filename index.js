const { Router } = require('express')
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// Import Router
const authRouter = require('./routers/auth')
const posts = require('./routers/posts')

const port = 8080
dotenv.config()
// Connection database
mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Database Connected`)
    }).catch((err) => {
        console.log(`Cannot connect to Database!`, err)
    });


// Middleware
app.use(express.json())

// Middleware Router
app.use('/api/user', authRouter)
app.use('/api/posts', posts)

// Connection database
app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`)
})