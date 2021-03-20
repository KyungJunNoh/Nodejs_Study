var express = require('express');
var dbj = require('./db.json');
var mysql = require('mysql2');

//mysql 커넥션 생성
var connection = mysql.createConnection({
  host : dbj.host,
  post : dbj.post,
  user : dbj.user,
  password : dbj.password,
  database : dbj.database
})

module.exports = connection;

// connection.query('select * from test_user', function (err, rows, fields) { //쿼리를 실행함, 콜백함수에서 총 3개의 파라미터가 반환되는데 각각의 의미는
//   // err - 에러가 판단했는지 여부이다. 에러가 일어났다면 어떤 에러인지도 알 수 있다.
//   // rows - 쿼리의 실행결과를 가지고 온 데이터이다.
//   // fields - 쿼리의 실행결과를 가지고 온 데이터들의 필드정보이다.
//     //connection.end();
//     if (!err) { // 만약 에러가 일어나지않는다면
//         console.log(rows);
//         console.log(fields);
//         var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
//             'fields : ' + JSON.stringify(fields);
//         res.send(result);
//     } else {
//         console.log('query error : ' + err);
//         res.send(err);
//     }
// });