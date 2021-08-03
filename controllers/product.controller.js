const Product = require("../models/product.model.js");
const fs = require("fs");
var multer = require('multer');

var upload = multer({ dest: '../uploads/' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage }).single('productJson');
var jsonData = '';
// Create and Save a new product
exports.importProducts = (req, res) => {
    // Validate request

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    //return res.send("its ok");

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            throw err;
        } else if (err) {
            // An unknown error occurred when uploading.
            throw err;
        }
        jsonData = req.files.productJson.data.toString('utf-8');
        console.dir(jsonData);
        //console.dir('file: ' + file);
        if (!jsonData) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return res.send(error);
        }
        // Everything went fine.
    });

    //    jsonData = JSON.parse(jsonData);

    return res.send(jsonData);

};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    const limit = 2;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    Product.getAll(limit, offset, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        else {
            var jsonResult = {
                'page_number': page,
                'products': data
            }
            res.send(jsonResult);
        }
    });
};