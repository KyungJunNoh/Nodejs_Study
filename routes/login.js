const e = require('express');
var express = require('express');
const { Select } = require('../db/mysql-db');
var router = express.Router();
var mysqldb = require('../db/mysql-db');

router.get('/', function(req, res, next){
    res.render('login');
});

router.post('/login', function (req, res, next) {
    var userId = req.body.userId;
    var userPw = req.body.userPw;
    mysqldb.Select(userId,userPw,function(rows, err){
        if(rows != "") {
            res.json({
                "code": "200",
                "data" : userId
            });
            console.log("로그인 성공");
        } else {
            res.json({"data" : "실패"});
            console.log("로그인 실패");
        }
    });
});

// router.post('/', function (req, res, next) {
//     var userId = req.body['userId'];
//     var userPw = req.body['userPw'];
//     mysql_db.query('select * from test_user where id=\'' + userId + '\' and pw=\'' + userPw + '\'', function (err, rows, fields) {
//         if (!err) {
//             if (rows[0]!=undefined) {
//                 res.send('id : ' + rows[0]['id'] + '<br>' +
//                     'pw : ' + rows[0]['pw']);
//             } else {
//                 res.send('no data');
//             }

//         } else {
//             res.send('error : ' + err);
//         }
//     });
// });
module.exports = router;