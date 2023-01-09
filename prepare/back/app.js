// node는 서버가 아니다!
// 익스프레스로 라우팅하기

// app.get: 가져오다 
// app.post: 생성하다
// app.put: 전체 수정 ex) 게시글의 모든 것을 수정할 때
// app.patch: 부분 수정 ex) 전체 중 닉네임만 수정할 때 = 이게 많이 쓰임
// app.options: 찔러보기 ex) 서버야 나 요청보내면 받아줄 거야?
// app.head: 헤더만 가져오기 (헤더/바디) 헤더: 바디의 부가적인 정보를 받아온다.


const express = require('express');

const app = express();

app.get('/' , (req,res) => {
    res.send('hello express') // express에서는 end가 아니라 send!
});

app.get('/api' , (req,res) => {
    res.send('hello api') // express에서는 end가 아니라 send!
});

app.get('/api/posts' , (req,res) => {
    res.json([ // json방식으로 응답해준다! 는 뜻!
        {id: 1, content: 'hello1'},
        {id: 2, content: 'hello2'},
        {id: 3, content: 'hello3'}
    ])
});

app.post('/api/post' , (req,res) => {
    res.json({id:1 , content: 'hello post'}) // 여기 부분은 백엔드와 상의해서 보여주는 걸 정하면 된다.
});

app.delete('/api/post' , (req,res) => {
    res.json({id:1})
});

app.listen(3065 , () => {
    console.log('서버 실행 중')
});