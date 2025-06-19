const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()


app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send('Welcome to the server!')
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`)
})