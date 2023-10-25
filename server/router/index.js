const Router = require('express');
const router = new Router();
const bbqsMenuRouter = require('./bbqsMenuRouter');

router.use('/bbqs', bbqsMenuRouter);

module.exports = router;