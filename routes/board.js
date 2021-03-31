var express = require('express');
var router = express.Router();

var mysqlDB = require('../db/mysql-db');

router.get('/', function (req, res, next) {
    res.send("hello board");
});

router.post('/', function (req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    console.log(title);
    console.log(content);
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

    //res.json({"title" : title,
    //"content" : content});
    
    // mysqlDB.Insert(userId,userPw,function(rows,err){
    //if(!err){
    //         res.json({"data" : "success"});
    //         console.log("success");
    //     }else{
    //         res.json({"data" : "fail"});
    //         console.log("fail");
    //     }
    // })
});

module.exports = router;
