const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://dilip:vv1BVmfjs60d8E8Z@cluster0.xxhkogy.mongodb.net/?retryWrites=true&w=majority"


const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully")
    })
}
module.exports = connectToMongo;
// vv1BVmfjs60d8E8Z