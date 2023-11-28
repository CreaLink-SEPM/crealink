const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://crealink:crealinksepm@crealink.emipjc1.mongodb.net/?retryWrites=true&w=majority'
        )
        console.log(`MongpDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}
module.exports = connectDB