var express = require('express');
var dbj = require('./db.json');
var mysql = require('mysql');

//mysql 커넥션 생성
var connection = mysql.createConnection({
  host : dbj.host,
  post : dbj.post,
  user : dbj.user,
  password : dbj.password,
  database : dbj.database
})

module.exports = {
  SQLconnect : function() {
    connection.connect(function(err){
      if(err) {
        console.log(err);
      } else {
        console.log("[DB연결 완료]");
      }
    });
  }, // db연결
  SQLdisconnect : function(){
    connection.end()
    console.log("[DB연결 종료]");
  },
  Select : function(userId,userPw,callback){
    connection.query('select * from test_user where id=? and pw = ?',[userId,userPw],function(err,rows){
      console.log("[SELECT 완료]");
      callback(rows, err);
    });
  },
  Insert : function(userId,userPw,callback){
    connection.query('insert into test_user(id,pw)values(?,?)',[userId,userPw],function(err,rows){
      console.log("[Insert 완료]");
      callback(rows, err);
    });
  },
  Update : function(userId,userPwNew,callback){
    connection.query('UPDATE test_user SET pw=? WHERE id=?',[userPwNew,userId],function(err,rows){
      console.log("[Update 완료]");
      callback(rows, err);
    })
  },
  Delete : function(userId,callback){
    connection.query("DELETE FROM test_user WHERE id=?",[userId],function(err,rows){
      console.log("[Delete 완료]");
      callback(rows, err);
    })
  },
  boardInsert : function(title,content,callback){
    connection.query("INSERT INTO board(title,content)values(?,?)",[title,content],function(err,rows){
      console.log("[boardInsert 완료]");
      callback(rows,err);
    })
  },
  boardUpdate : function(title,content,idx,callback){
    connection.query("UPDATE board SET title=?, content=? WHERE idx=?",[title,content,idx],function(err,rows){
      console.log("[boardUpdate 완료]");
      callback(rows, err);
    })
  },
  boardDelete : function(idx,callback){
    connection.query("DELETE FROM board WHERE idx = ?",[idx],function(err,rows){
      console.log("[boardDelete 완료]");
      callback(rows,err);
    })
  } 
}