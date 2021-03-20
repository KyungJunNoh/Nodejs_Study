var express = require('express');
var router = express.Router();

var mysqlDB = require('../db/mysql-db');

router.get('/', function (req, res, next) {
    res.render('join');
});

router.post('/', function (req, res, next) {
    var userId = req.body['userId'];
    var userPw = req.body['userPw'];
    var userPwRe = req.body['userPwRe'];
    if (userPw == userPwRe && userPw > 1 ) { // 생성할때의 패스워드, 패스워드 확인이 일치한다면
        // 그리고 유저의 패스워드 길이가 1 초과일경우에
        mysqlDB.query('insert into test_user values(?,?)', [userId, userPw], function (err, rows, fields) {
            if (!err) {
                res.send('success');
            } else {
                res.send('err : ' + err); //id가 중복될때 실행 
                //err 인것을 판별하는이유는 데베에서 test_user 테이블을만들때 id를 기본키 즉, 중복이안되는 어트리뷰트로 만들었기때문
            }
        });
    }else{
        res.send('password not match!');
    }
});

module.exports = router;
