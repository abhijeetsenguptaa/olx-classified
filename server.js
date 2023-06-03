require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connection } = require('./configs/connection');
const { userRoute } = require('./routes/user.route');



const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.port || 8080;

app.get('/', async (req, res) => {
    res.status(200).send({
        status: true,
        msg: 'Welcome to OLX Classified..'
    })
})

app.use(userRoute);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Server is connected to the Database.');
    } catch {
        console.log('Server could not connect to the Database.');
    }
    console.log(`Server is listening to the port : ${PORT}`);
})