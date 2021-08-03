const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.product_id = product.product_id;
  this.product_name = product.product_name;
  this.sku_code = product.sku_code;
  this.price = product.price;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO product_data SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.getAll = (limit,offset,result) => {
    sql.query(`SELECT * FROM product_data limit ${offset}, ${limit}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("products: ", res);
      result(null, res);
    });
  };
  

module.exports = Product;