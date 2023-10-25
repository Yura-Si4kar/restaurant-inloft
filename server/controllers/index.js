const fs = require('fs');
const path = require('path');
const MenuController = require('./MenuController');

const bbqsMenuFilePath = path.join(__dirname, '..', 'api', 'bbqs.json');
const bestMenuFilePath = path.join(__dirname, '..', 'api', 'best.json');
const breadsMenuFilePath = path.join(__dirname, '..', 'api', 'breads.json');
const burgersMenuFilePath = path.join(__dirname, '..', 'api', 'burgers.json');
const chocolatesMenuFilePath = path.join(__dirname, '..', 'api', 'chocolates.json');
const dessertsMenuFilePath = path.join(__dirname, '..', 'api', 'desserts.json');
const drinksMenuFilePath = path.join(__dirname, '..', 'api', 'drinks.json');
const friedChickenMenuFilePath = path.join(__dirname, '..', 'api', 'fried-chicken.json');
const iceCreamMenuFilePath = path.join(__dirname, '..', 'api', 'ice-cream.json');
const pizzasMenuFilePath = path.join(__dirname, '..', 'api', 'pizzas.json');
const porksMenuFilePath = path.join(__dirname, '..', 'api', 'porks.json');
const sandwichesMenuFilePath = path.join(__dirname, '..', 'api', 'sandwiches.json');
const sausagesMenuFilePath = path.join(__dirname, '..', 'api', 'sausages.json');
const steaksMenuFilePath = path.join(__dirname, '..', 'api', 'steaks.json');
const foodsMenuFilePath = path.join(__dirname, '..', 'api', 'foods.json');
const tablesFilePath = path.join(__dirname, '..', 'api', 'tables.json');
const personnelFilePath = path.join(__dirname, '..', 'api', 'personnel.json');
const salesFilePath = path.join(__dirname, '..', 'api', 'sales.json');

const bbqsMenuController = new MenuController(bbqsMenuFilePath, 'bbqs');
const bestMenuController = new MenuController(bestMenuFilePath, 'best');
const breadsMenuController = new MenuController(breadsMenuFilePath, 'breads');
const burgersMenuController = new MenuController(burgersMenuFilePath, 'burgers');
const chocolatesMenuController = new MenuController(chocolatesMenuFilePath, 'chocolates');
const dessertsMenuController = new MenuController(dessertsMenuFilePath, 'desserts');
const drinksMenuController = new MenuController(drinksMenuFilePath, 'drinks');
const friedChickenMenuController = new MenuController(friedChickenMenuFilePath, 'fried-chicken');
const iceCreamMenuController = new MenuController(iceCreamMenuFilePath, 'ice-cream');
const pizzasMenuController = new MenuController(pizzasMenuFilePath, 'pizzas');
const porksMenuController = new MenuController(porksMenuFilePath, 'porks');
const sandwichesMenuController = new MenuController(sandwichesMenuFilePath, 'sandwiches');
const sausagesMenuController = new MenuController(sausagesMenuFilePath, 'sausages');
const steaksMenuController = new MenuController(steaksMenuFilePath, 'steaks');
const foodsMenuController = new MenuController(foodsMenuFilePath, 'foods');
const tablesController = new MenuController(tablesFilePath, 'tables');
const personnelController = new MenuController(personnelFilePath, 'personnel');
const salesController = new MenuController(salesFilePath, 'sales');

module.exports = {
    bbqs: bbqsMenuController,
    best: bestMenuController,
    breads: breadsMenuController,
    burgers: burgersMenuController,
    chocolates: chocolatesMenuController,
    desserts: dessertsMenuController,
    drinks: drinksMenuController,
    fried_hicken: friedChickenMenuController,
    ice_cream: iceCreamMenuController,
    pizzas: pizzasMenuController,
    porks: porksMenuController,
    sandwiches: sandwichesMenuController,
    sausages: sausagesMenuController,
    steaks: steaksMenuController,
    foods: foodsMenuController,
    tables: tablesController,
    personnel: personnelController,
    sales: salesController
};