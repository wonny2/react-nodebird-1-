// node는 서버가 아니다!

const http = require('http');
const server  = http.createServer((req,res) => { // req: 요청, res: 응답
    // console.log(req.url, req.method);
    res.write('<h1>heading 1</h1>')
    res.end('Hello node')
});
server.listen(3065 , () => {
    console.log('서버 실행 중')
});