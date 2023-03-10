// node는 서버가 아니다!

// app.get: 가져오다 
// app.post: 생성하다
// app.put: 전체 수정 ex) 게시글의 모든 것을 수정할 때
// app.patch: 부분 수정 ex) 전체 중 닉네임만 수정할 때 = 이게 많이 쓰임
// app.options: 찔러보기 ex) 서버야 나 요청보내면 받아줄 거야?
// app.head: 헤더만 가져오기 (헤더/바디) 헤더: 바디의 부가적인 정보를 받아온다.

// require를 쓰는 이유는 node에서는 export/import를 안 쓴다.
// 대신 require과 module.export를 쓴다. 
const express = require('express');

const postRouter = require('./routes/post');

const app = express();


app.get('/' , (req,res) => {
    res.send('hello express') // express에서는 end가 아니라 send!
});

app.get('/posts' , (req,res) => {
    res.json([ // json방식으로 응답해준다! 는 뜻!
        {id: 1, content: 'hello1'},
        {id: 2, content: 'hello2'},
        {id: 3, content: 'hello3'}
    ])
});

app.use('/post', postRouter);
// post와 delete의 /post가 겹쳐서 
// 라우터를 분리하여 '/post' 픽스해주고,
// POST의 /post || DELETE의 /post로 바꾼 것이다!!

app.listen(3065 , () => {
    console.log('서버 실행 중')
});