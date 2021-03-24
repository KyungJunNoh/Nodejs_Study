var express = require('express');
var router = express.Router();

var mysqlDB = require('../db/mysql-db');

router.get('/', function (req, res, next) {
    res.render('join');
});

router.post('/', function (req, res, next) {
    var userId = req.body.userId;
    var userPw = req.body.userPw;
    mysqlDB.Insert(userId,userPw,function(rows,err){
        if(!err){
            res.json({"data" : "success"});
            console.log("success");
        }else{
            res.json({"data" : "fail"});
            console.log("fail");
        }
    })
});

module.exports = router;
