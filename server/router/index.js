const { Router } = require('express');
const MenuRouter = require('./MenuRouter');
const controllers = require('../controllers');
const MenuItemsRouter = require('./MenuItemsRouter');

const categories = ['bbqs', 'best', 'breads', 'burgers', 'chocolates', 'desserts', 'drinks', 'fried_chicken', 'ice_cream', 'pizzas', 'porks', 'sandwiches', 'sausages', 'steaks', 'foods'];
const menuItems = ['tables', 'personnel', 'sales'];

const router = Router();

categories.forEach(category => {
    const controller = controllers[category];
    if (controller && typeof controller.getAll === 'function') {
        const menuRouter = new MenuRouter(controller);
        router.use(`/${category}`, menuRouter.getRouter());
    } else {
        console.error(`Invalid controller for category: ${category}`);
    }
});

menuItems.forEach((item) => {
    const controller = controllers[item];
    if (controller && typeof controller.getAll === 'function') {
        const menuItemRouter = new MenuItemsRouter(controller);
        router.use(`/${item}`, menuItemRouter.getRouter());
    } else {
        console.error(`Invalid controller for menu item: ${item}`);
    }
});

router.use('/:item', (req, res) => {
    res.status(404).json({ error: 'Category not found' });
});

module.exports = router;