const path = require('path')
const express = require('express')
const connectDb = require('./config/database')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const cors = require('cors')

connectDb()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// ROUTES
app.use("/api/task", require("./routes/taskRoutes"))
app.use("/api/users", require("./routes/userRoutes"))

// FRONTEND BUILD
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))

  app.get('*', (req, res) => res.sendFile(
    path.resolve(__dirname, '../', 'client', 'dist', 'index.html')
  ))
} else {
  app.get('/', (req, res) => res.send("Please set env to production"))
}

app.listen(PORT, () => {
  console.log(`server active, port: ${PORT}`)
})
