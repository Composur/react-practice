const router = require('express').Router();
router.get('/', (req, res, next) => {
    res.send('test')
    console.log(req.cookies)
})
module.exports = router