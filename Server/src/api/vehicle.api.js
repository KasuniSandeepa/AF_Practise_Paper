const express = require("express");
const router = express.Router();
const controller = require("../controllers/vehicle.controller");

module.exports = function(){

    router.get("/", controller.getAllVehicles);
    router.post("/create", controller.addVehicle);



    return router;
}