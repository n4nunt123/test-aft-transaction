const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { connection } = require('./config/config')
const router = require('./routes/router')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connection()
  .then(() => {
    app.use(router)
    app.listen(port, () => {
      console.log('Server listening to port', port)
    })
  })
  .catch((err) => {
    console.log(err)
    console.log('Server refused to connect')
  })