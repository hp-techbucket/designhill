module.exports = app => {
const user = require('../controllers/user.controller.js');

app.post('/user/register',user.register);

app.post('user/login',user.login);

}