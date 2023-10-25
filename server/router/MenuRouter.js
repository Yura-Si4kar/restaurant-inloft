const { Router } = require('express');

class MenuRouter {
    constructor(controller) {
        this.router = Router();
        this.controller = controller;

        this.router.get('/', this.controller.getAll.bind(this.controller));
        this.router.put('/:id', this.controller.changeOne.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = MenuRouter;
