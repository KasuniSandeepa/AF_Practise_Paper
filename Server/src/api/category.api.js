const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");

module.exports = function(){

    router.get("/", controller.getAllCategories);
    router.get("/getVehicles/:id", controller.getVehiclesForCategory);
    router.post("/create", controller.addCategory);

    return router;
}