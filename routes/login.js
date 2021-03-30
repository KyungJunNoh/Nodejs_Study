var express = require('express');
const session = require('express-session');
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
            req.session.userid = userId;
            req.session.save(function(){
                res.json({"data" : "success"});
            });
            console.log(req.session.userid);
        } else {
            res.json({"data" : "실패"});
            console.log("로그인 실패");
        }
    });
    mysqldb.SQLdisconnect();
});

router.post('/logout',function(req,res,err){
    // req.session.destroy();
    // res.clearCookie(); // 세션 쿠키 삭제
    console.log('로그아웃 처리');
    req.session.destroy(
    function (err) {
        if (err) {
            console.log('세션 삭제시 에러');
            return;
        }
        res.json({"data" : "success"});
    });//세션정보 삭제    
})

module.exports = router;