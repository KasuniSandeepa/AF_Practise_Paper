const mongoose = require("mongoose");
const Vehicle = require('../models/Vehicle');

const addVehicle = async (req,res) => {
    if(req.body){
        const vehicle = new Vehicle(req.body);
        await vehicle.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
    }
}


const getAllVehicles = async (req,res) => {
    await Vehicle.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        })
}




module.exports = {
    addVehicle,
    getAllVehicles
}