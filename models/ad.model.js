const mongoose = require('mongoose');



const adSchema = mongoose.Schema({
    userId : String,
    name: String,
    description: String,
    category: {
        type: String,
        enum: ["Clothing", "Electronics", "Furniture", "Other"]
    },
    image: String,
    location: String,
    postedAt: Date,
    price: Number
}, {
    versionKey: false
})



const AdModel = mongoose.model('ads', adSchema);


module.exports = { AdModel };