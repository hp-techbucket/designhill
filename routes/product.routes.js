module.exports = app => {
    const products = require("../controllers/product.controller.js");

    // import product json
    app.post("/importProducts", products.importProducts);
    // Retrieve all products
    app.get("/products", products.findAll);

    const user = require('../controllers/user.controller.js');
    app.post('/user/register',user.register);
    //app.post('user/login',user.login);

};