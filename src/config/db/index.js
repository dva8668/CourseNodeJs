const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/D_education_dev');
        console.log("Done mongoose")
    } catch (error) {
        console.log("Fail connect to mongoose")
    }
}
module.exports = { connect }