const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongo database connected: ${db.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDb