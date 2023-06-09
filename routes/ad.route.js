const express = require('express');
const { AdModel } = require('../models/ad.model');



const adsRoute = express.Router();

adsRoute.post('/', async (req, res) => {
    try {
        const { name, description, category, image, location, postedAt, price } = req.body;
        const addItem = new AdModel({ name, description, category, image, location, postedAt, price });
        await addItem.save();
        res.status(200).send({
            status: true,
            msg: 'Your Item has been added to the OLX-Classified List.'
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in adding a new item to the list.'
        })
    }
})


adsRoute.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        await AdModel.findByIdAndUpdate({ _id: id }, updatedData);
        res.status(200).send({
            status: true,
            msg: `Your Item With ID : $ {} has been updated.`,
            data: await AdModel.find()
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in updating the data to the database.'
        })
    }
})
adsRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await AdModel.findByIdAndDelete({ _id: id });
        res.status(200).send({
            status: true,
            msg: `Item with ID : ${id} has been successfully deleted.`,
            data: await AdModel.find()
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in deleting the data from the database.'
        })
    }
})

adsRoute.get('/', async (req, res) => {
    try {
        const data = await AdModel.find();
        res.status(200).send({
            status: true,
            data: data
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in fetching the data from the database.'
        })
    }
})


// All the functionalities routes starts here ------------------------------

adsRoute.get('/filter', async (req, res) => {
    try {
        const id = req.query.id;
        const category = req.query.category;
        const title = req.query.title;
        const limit = req.query.limit;
        const page = req.query.page;
        if (id) {
            const data = await AdModel.find({ _id: id });
            res.status(200).send({
                status: true,
                data: data
            })
        } if (limit) {
            const data = await AdModel.find().skip((page - 1) * limit).limit(limit);
            res.status(200).send({
                status: true,
                data: data
            })
        }
        if (category) {
            const data = await AdModel.find({ category: category });
            res.status(200).send({
                status: true,
                msg: `Result for ${category}.`,
                data: data
            })
        }
        if (title) {
            const data = await AdModel.find({ name: { $regex: new RegExp(title, 'i') } });
            res.status(200).send({
                status: true,
                msg: `Result for ${title}.`,
                data: data
            })
        }
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in fetching the required category from the database.'
        })
    }
})


adsRoute.get('/sortAsc', async (req, res) => {
    try {
        const data = await AdModel.find().sort({ postedAt: 1 });
        res.status(200).send({
            status: true,
            data: data
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in fetching the required data in ascending order from the database.'
        })
    }
})

adsRoute.get('/sortDesc', async (req, res) => {
    try {
        const data = await AdModel.find().sort({ postedAt: -1 });
        res.status(200).send({
            status: true,
            data: data
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in fetching the required data in descending order from the database.'
        })
    }
})



module.exports = { adsRoute };