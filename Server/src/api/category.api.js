const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");

module.exports = function(){

    router.get("/", controller.getAllCategories);
    router.get("/getVehicles/:id", controller.getVehiclesForCategory);
    router.get("/getCategory/:id", controller.getCategory);
    router.post("/create", controller.addCategory);
    router.post('/calculateTripCharge', controller.calculateTripCharge);

    return router;
}