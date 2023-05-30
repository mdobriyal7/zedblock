const mongoose = require('mongoose')


const connectDB = () => {
    try {
     mongoose.connect(process.env.URI)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB