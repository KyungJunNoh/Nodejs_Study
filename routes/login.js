var express = require('express');
// const { Select } = require('../db/mysql-db');
var router = express.Router();
var mysqldb = require('../db/mysql-db');

router.get('/', function(req, res, next){
    res.render('login');
});

router.post('/login', function (req, res, next) {
    var userId = req.body.userId;
    var userPw = req.body.userPw;
    mysqldb.SQLconnect();
    mysqldb.Select(userId,userPw,function(rows, err){
        if(rows != "") {
            res.cookie("ID",req.body.userId);
            console.log(req.session);
            res.json({
                "code": "200",
                "data" : userId
            },);
            console.log("로그인 성공");
        } else {
            res.json({"data" : "실패"});
            console.log("로그인 실패");
        }
    });
    mysqldb.SQLdisconnect();
});

router.post('/logout',function(req,res,err){
    console.log(req.session);
    req.session.destroy();
    res.clearCookie('sid');
    console.log(req.session);
    res.send("ok");
})
module.exports = router;