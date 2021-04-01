var express = require('express');
var router = express.Router();

var mysqlDB = require('../db/mysql-db');

router.get('/', function (req, res, next) {
    res.send("hello board");
});

router.post('/insert', function (req, res, next) {
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

router.post('/update', function (req, res, next) {
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

router.post('/delete',function(req,res,err){
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
