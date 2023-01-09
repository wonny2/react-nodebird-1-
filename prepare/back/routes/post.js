const express = require('express');
const router = express.Router();

router.post('/' , (req,res) => { // 이제는 POST /post
    res.json({id:1 , content: 'hello post'}) // 여기 부분은 백엔드와 상의해서 보여주는 걸 정하면 된다.
});

router.delete('/' , (req,res) => { // 이제는 DELETE /post
    res.json({id:1})
});

module.exports = router;