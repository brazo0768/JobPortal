var express = require("express");
var router = express.Router();
const portalcontroller = require("../routes/controller/portal.controller");


// Create a new Portal
router.post("/addjobs", portalcontroller.create);

// Retrieve all Portals
router.get("/findAll", portalcontroller.findAll);

// Update a Portal with id
router.put("/update/:id", portalcontroller.update);

// Delete a Portal with id
router.delete("/delete/:id", portalcontroller.delete);

module.exports = router;