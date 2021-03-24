var express = require('express');
var router = express.Router();
var mysqldb = require('../db/mysql-db');

router.get('/', function (req, res, next) {
    res.render('password-change');
});

router.put('/', function (req, res, next) {
    var userId = req.body['userId'];
    var userPw = req.body['userPw'];
    var userPwNew = req.body['userPwNew'];
    mysqldb.Select(userId,userPw,function(rows,err){
        if(!err){
            console.log(rows);
            if(rows != ""){
                mysqldb.Update(userId,userPwNew,function(rows,err){
                    res.json({"data" : "success"});
                });
            }else{
                res.json({"data" : "fail"});
            }
        }else{
            console.log(err);
        }
    })
});

module.exports = router;
