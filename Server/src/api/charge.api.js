const express = require("express");
const router = express.Router();
const controller = require("../controllers/tripChargeController");

module.exports = function(){

    router.post("/charge", controller.calculateAmount);



    return router;
}