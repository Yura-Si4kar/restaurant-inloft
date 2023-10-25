const { Router } = require('express');
const MenuRouter = require('./MenuRouter');
const controllers = require('../controllers');

const router = Router();

router.use('/:item', (req, res, next) => {
    const item = req.params.item;
    switch (item) {
        case 'bbqs':
            const bbqsMenuRouter = new MenuRouter(controllers.bbqs);
            router.use('/bbqs', bbqsMenuRouter.getRouter());
            break;
        case 'best':
            const bestMenuRouter = new MenuRouter(controllers.best);
            router.use('/best', bestMenuRouter.getRouter());
            break;
        case 'breads':
            const breadsMenuRouter = new MenuRouter(controllers.breads);
            router.use('/breads', breadsMenuRouter.getRouter());
            break;
        case 'burgers':
            const burgersMenuRouter = new MenuRouter(controllers.burgers);
            router.use('/burgers', burgersMenuRouter.getRouter());
            break;
        case 'chocolates':
            const chocolatesMenuRouter = new MenuRouter(controllers.chocolates);
            router.use('/chocolates', chocolatesMenuRouter.getRouter());
            break;
        case 'desserts':
            const dessertsMenuRouter = new MenuRouter(controllers.desserts);
            router.use('/desserts', dessertsMenuRouter.getRouter());
            break;
        case 'drinks':
            const drinksMenuRouter = new MenuRouter(controllers.drinks);
            router.use('/drinks', drinksMenuRouter.getRouter());
            break;
        case 'fried-hicken':
            const friedChickenMenuRouter = new MenuRouter(controllers.fried_hicken);
            router.use('/fried-chicken', friedChickenMenuRouter.getRouter());
            break;
        case 'ice-cream':
            const iceCreamMenuRouter = new MenuRouter(controllers.ice_cream);
            router.use('/ice-cream', iceCreamMenuRouter.getRouter());
            break;
        case 'pizzas':
            const pizzasMenuRouter = new MenuRouter(controllers.pizzas);
            router.use('/pizzas', pizzasMenuRouter.getRouter());
            break;
        case 'porks':
            const porksMenuRouter = new MenuRouter(controllers.porks);
            router.use('/porks', porksMenuRouter.getRouter());
            break;
        case 'sandwiches':
            const sandwichesMenuRouter = new MenuRouter(controllers.sandwiches);
            router.use('/sandwiches', sandwichesMenuRouter.getRouter());
            break;
        case 'sausages':
            const sausagesMenuRouter = new MenuRouter(controllers.sausages);
            router.use('/sausages', sausagesMenuRouter.getRouter());
            break;
        case 'steaks':
            const steaksMenuRouter = new MenuRouter(controllers.steaks);
            router.use('/steaks', steaksMenuRouter.getRouter());
            break;
        case 'steaks':
            const foodsMenuRouter = new MenuRouter(controllers.foods);
            router.use('/foods', foodsMenuRouter.getRouter());
            break;
        case 'tables':
            const tablesRouter = new MenuRouter(controllers.tables);
            router.use('/tables', tablesRouter.getRouter());
            break;
        case 'personnel':
            const personnelRouter = new MenuRouter(controllers.personnel);
            router.use('/personnel', personnelRouter.getRouter());
            break;
        case 'sales':
            const salesRouter = new MenuRouter(controllers.sales);
            router.use('/sales', salesRouter.getRouter());
            break;
        default:
            res.status(404).json({ error: 'Category not found' });
            break;
    }

    next();
});

module.exports = router;