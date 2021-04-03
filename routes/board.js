var express = require('express');
var router = express.Router();

var mysqlDB = require('../db/mysql-db');
var path = require('path');

router.get('/', function (req, res, next) { // 게시판 글 전체 조회
    mysqlDB.boardAllSelect(function(rows,err){
        console.log(rows);
        if(!err){
            res.json({"data" : rows}); // 게시판 글 목록 전체 조회
        }else{
            res.json(err);
        }
    })
});

router.get('/:pageid', function (req, res, next) { // 게시판 글 단일 조회
    var idx = path.parse(req.params.pageid).base;
    mysqlDB.boardSelect(idx,function(rows,err){
        console.log(rows);
        if(!err){
            res.json({"data" : rows}); // 게시판 글 목록 단일 조회
        }else{
            res.json(err);
        }
    })
});

router.post('/insert', function (req, res, next) { // 게시판 글 생성
    var title = req.body.title;
    var content = req.body.content;
    mysqlDB.boardInsert(title,content,function(rows,err){
        console.log(rows);
        if(!err){
            res.json({"data" : "success"});
            console.log("success");
        }else{
            res.json({"data" : "fail"});
            console.log("fail");
        }
    })
});

router.put('/update', function (req, res, next) { // 게시판 글 수정
    var idx = req.body.idx;
    var title = req.body.title;
    var content = req.body.content;
    mysqlDB.boardUpdate(title,content,idx,function(rows,err){
        console.log(rows);
        if(!err){
            res.json({"data" : "success"});
            console.log("success");
        }else{
            res.json({"data" : "fail"});
            console.log("fail");
        }
    })
});

router.delete('/delete',function(req,res,err){ // 게시판 글 삭제
    var idx = req.body.idx;
    mysqlDB.boardDelete(idx,function(rows,err){
        console.log(rows);
        if(!err){
            res.json({"data" : "success"});
        }else{
            res.json({"data" : "fail"})
            console.log(err);
        }
    })
})

module.exports = router;