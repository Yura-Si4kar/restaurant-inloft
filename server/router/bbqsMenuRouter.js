const Router = require('express');
const router = new Router();
const bbqsController = require('../controller/bbqsController');

router.get('/', bbqsController.getAll);
router.put('/:id', bbqsController.changeOne);

module.exports = router;