var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');

router.use(bodyParser.urlencoded({ extended: false }))


router.get("/", function (req, res) {
    console.log("메인 페이지");

    var queryString = 'select * from post_table order by id desc';

    getConnection().query(queryString, function (error, result) {
        fs.readFile('home.html', 'utf-8', function (error, data) {
            res.send(ejs.render(data, {
                data: result,
            }));
        })
    });

});

router.get("/create", function (req, res) {
    console.log("작성 페이지");

    fs.readFile('create.html', 'utf-8', function (error, data) {
        res.send(data);
    })
});

//작성 뷰에서 데이터가 넘어오면
router.post("/create", function (req, res) {
    console.log("포스트 작성 진행");
    var body = req.body;
    getConnection().query('insert into post_table(title,description) values (?,?)', [body.title, body.description], function () {
        //응답
        res.redirect('/');
    })
})

//삭제
router.get("/delete/:id", function (req, res) {
    console.log("삭제 진행합니다.");

    getConnection().query('delete from post_table where id = ?', [req.params.id], function () {
        res.redirect('/');
    });

})

//수정 페이지
router.get("/edit/:id", function (req, res) {
    console.log("수정 페이지");

    fs.readFile('edit.html', 'utf-8', function (error, data) {
        getConnection().query('select * from post_table where id=?', [req.params.id], function (error, result) {
            res.send(ejs.render(data, {
                data: result,
            }))
        })
    });
})

//수정 뷰에서 데이터가 넘어오면
router.post("/edit/:id", function (req, res) {
    console.log("수정 진행합니다.");

    var body = req.body;
    getConnection().query('update post_table set title=?, description=? where id=?',
        [body.title, body.description, req.params.id], function () {
            res.redirect('/');
            console.log("수정 완료되었습니다.");
        })
})






// mysql db 연결 함수
var pool = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'rkawkeod',
    database : 'nodedatabase'
})

// 디비 연결 함수
function getConnection() {
    return pool;
}

module.exports = router;








