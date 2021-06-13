const mongoose = require("mongoose");
const Category = require('../models/Category');
const Vehicle = require('../models/Vehicle');

const addCategory = async (req,res) => {
    if(req.body){
        const category = new Category(req.body);
        await category.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
    }
}


const getAllCategories = async (req,res) => {
    await Category.find({}).populate('vehicles','code model type name')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        })
}

const getVehiclesForCategory = async (req,res) => {
    if(req.params && req.params.id){
        const category = await Category.findById(req.params.id).populate('vehicles','code model type name amount')
            .then(data => {
                res.status(200).send({ data: data.vehicles });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
    }

}


const getCategory = async (req,res) => {
    if(req.params && req.params.id){
        const category = await Category.findById(req.params.id).populate('vehicles','code model type name amount')
            .then(data => {
                res.status(200).send({ data: data});
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
    }

}

const calculateTripCharge = async (req, res) => {
    let totalCost = 0;
    let durationCost = 0;

    if (req.body) {

        if(req.body.duration <= 2 ){
            durationCost = 1000;
            console.log(req.body);
        }else if(req.body.duration  >= 2 ){
            durationCost = 2000;
        }else if(2 < req.body.duration  >=  4 ){
            durationCost = 4000;
        }else if(4 < req.body.duration  >=  5 ){
            durationCost = 6000;
        }else if(5 < req.body.duration  >= 6 ){
            durationCost = 8000;
        }

        totalCost = (req.body.categoryAmount +  req.body.amount) * durationCost;
        console.log(totalCost);

        try{
            res.status(200).send({ cost: totalCost });
        } catch(error){
            res.status(500).send({ error: error.message });
        };
    }
}

module.exports = {
    addCategory,
    getAllCategories,
    getVehiclesForCategory,
    getCategory,
    calculateTripCharge
}
