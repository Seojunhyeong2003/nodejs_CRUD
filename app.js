// 모듈 임포트
var express = require('express');
var app = express()
var morgan = require('morgan')                          // 로그 모듈 임포트
var mysql = require('mysql')                            // mysql 임포트
var bodyParser = require('body-parser');                // express.js도 빌트인 body parser를 넣음 그래서 이 npm은 필요없을수도


//미들웨어 설정
app.use(morgan('short'));                              //로그 미들웨어
app.use(express.static('./public'))                   //기본 파일 폴더 위치 설정
app.use(bodyParser.urlencoded({extended:false}));

// 라우터
// 게시판리스트
var postRouter = require('./routes/post.js')
app.use(postRouter);
       

//서버 가동
app.listen(3000,function(){
    console.log("서버가동 : http://127.0.0.1:3000") 
});   