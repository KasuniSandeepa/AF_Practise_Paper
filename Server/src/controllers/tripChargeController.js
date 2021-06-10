const mongoose = require("mongoose");
const Category = require('../models/Category');
const Vehicle = require('../models/Vehicle');

const calculateAmount = async (req,res) => {
    if(req.body){
        res.status(200).send({ data: req.body });
    }
}

module.exports = {
    calculateAmount
}