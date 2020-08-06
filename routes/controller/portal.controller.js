const db = require("../modal");
const Portal = db.PortalSchema;

console.log(Portal)


// Create  new Portal
exports.create = (req, res) => {
    console.log(req)
    /* if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    } */

    /* const jobdata = new Portal({
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords,
        location: req.body.location,
        status: req.body.status

    }); */
    Portal.create({
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords,
        location: req.body.location,
        status: req.body.status,
        city:req.body.city

    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the jobList."
        });
    });

};


// Retrieve all Portal from the database.
exports.findAll = (req, res) => {
    Portal.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
};


// Update a Portal by the id in the request
exports.update = (req, res) => {
    console.log("===================================", req)
    let id = req.params.id
    //let status = req.body.status
    Portal.findByIdAndUpdate(id, req.body, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

};

// Delete a Portal with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id
    Portal.findByIdAndDelete(id, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

};