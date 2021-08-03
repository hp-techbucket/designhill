const sql = require('./db.js');

const d = new Date();

const User = function(user){
    this.id = null;
    this.name = user.name,
    this.email = user.email,
    this.password = user.password,
    this.created_on = d.getTimestamp();
}

module.exports = User;

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err,res) => {
        if(err){
            console.log("error :", err);
            result(err,null);
            return;
        }
        console.log(JSON.stringify(res));
        console.log("user created : ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

Date.prototype.getTimestamp = function() {
    var year = this.getFullYear(),
        month = this.getMonth(),
        day = this.getDate(),
        hours = this.getHours(),
        minutes = this.getMinutes(),
        seconds = this.getSeconds();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds; 

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}
