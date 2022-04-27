const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn =  await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, useUnifiedTopology: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`.blue.bold.underline)
    } catch (error) {
        console.error(`ERROR: ${error.message}`.red.underline.bold)
    }
}

module.exports = connectDb;