var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var mysqldb = require('../db/mysql-db');

router.get('/', function(req, res, next){
    res.render('login');
});

router.post('/', function (req, res, next) {
    var userId = req.body['userId'];
    var userPw = req.body['userPw'];
    mysqldb.query('select * from test_user where id=? and pw = ?',[userId,userPw], function (err, rows, fields) { //쿼리를 실행함, 콜백함수에서 총 3개의 파라미터가 반환되는데 각각의 의미는
      // err - 에러가 판단했는지 여부이다. 에러가 일어났다면 어떤 에러인지도 알 수 있다.
      // rows - 쿼리의 실행결과를 가지고 온 데이터이다.
      // fields - 쿼리의 실행결과를 가지고 온 데이터들의 필드정보이다.
        if (!err) { // 만약 에러가 일어나지않는다면
            if(rows[0] != undefined){
                res.send('id : ' + rows[0]['id'] + '<br>' +
                    'pw : ' + rows[0]['pw']);
            } else {
                res.send('no data');
            }
        } else {
            console.log('query error : ' + err);
            res.send('error : ' + err);
        }
    });
});

module.exports = router;