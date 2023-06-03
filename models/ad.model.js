const mongoose = require('mongoose');



const adSchema = mongoose.Schema({
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
})



const AdModel = mongoose.model('ads', adSchema);


module.exports = { AdModel };