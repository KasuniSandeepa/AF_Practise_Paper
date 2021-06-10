const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vehicleAPI = require('./src/api/vehicle.api');
const categoryAPI = require('./src/api/category.api');
const chargeAPI = require('./src/api/charge.api');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8087;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log('Database Error: ', error.message);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Synced');
});

app.route('/').get((req, res) => {
    res.send('SLIIT FINAL PAPER');
})


app.use('/vehicle', vehicleAPI());
app.use('/category', categoryAPI());
app.use('/charge', chargeAPI());


app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});

