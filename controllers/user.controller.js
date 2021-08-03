const User = require('../models/user.model.js');

// register and Save a new user
exports.register = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Body can not be empty!"
      });
    }
  
    // Create a User
    const user = new User({
      name      : req.body.name.trim(),
      email     : req.body.email.trim(),
      password  : req.body.password.trim()
    });
  
    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };