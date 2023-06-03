const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    registered_on: {
        type: Date,
        default: Date.now
    }
})



const UserModel = mongoose.model('users', userSchema);


module.exports = { UserModel };