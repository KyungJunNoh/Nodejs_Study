var express = require('express');
var router = express.Router();

var mysqldb = require('../db/mysql-db');


router.get('/', function (req, res, next) {
    res.render('delete-account');
});

router.post('/', function (req, res, next) {
    var userId = req.body['userId'];
    var userPw = req.body['userPw'];
    mysqldb.Select(userId,userPw,function(rows, err){
        if(rows != "") {
            mysqldb.Delete(userId,function(rows,err){
                res.json({"data" : "성공"});
                console.log("삭제 완료");
            });
        } else {
            res.json({"data" : "실패"});
            console.log("삭제 실패");
        }
    });
});

module.exports = router;