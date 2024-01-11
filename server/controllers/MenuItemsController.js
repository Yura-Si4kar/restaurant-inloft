const Models = require('../models/model');
const ApiError = require('../error/ApiError');

class MenuItemsController {
    constructor(category) {
        this.Model = Models[category];
    }
    
    async create(req, res) {
        const bbqs = new this.Model(req.body);
        bbqs
            .save()
            .then((result) => {
                res
                    .status(201)
                    .json(result);
            })
            .catch((e) => {
                next(ApiError.internal(e.message))
            })  
    }

    async getAll(req, res, next) {
        this.Model
            .find() // повертає вказівник на повернену колекцію документів - cursor(інкапсулюють в собі набори отриманих з БД об'єктів)
            .sort({name: 1})
            .then((bbqs) => {
                res
                    .status(200)
                    .json(bbqs);
            })
            .catch((e) => {
                next(ApiError.internal(e.message))
            })
    }

    async updateOne(req, res) {
        this.Model
            .findByIdAndUpdate(req.params.id, req.body)
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => {
                next(ApiError.internal)
            })     
    }

    async delete(req, res) {
        this.Model
            .findByIdAndDelete(req.params.id)
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch((e) => {
                next(ApiError.internal(e.message))
            }) 
    }
}

module.exports = MenuItemsController;