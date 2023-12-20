const Models = require('../models/model');
const ApiError = require('../error/ApiError');

class CategoriesController {
    constructor(category) {
        this.Model = Models[category];
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
    
    async getOne(req, res, next) {
        this.Model
            .findById(req.params.id)
            .then((doc) => {
                res
                    .status(200)
                    .json(doc);
            })
            .catch((e) => {
                next(ApiError.internal(e.message))
            })
    }

    async updateOne(req, res, next) {
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
}

module.exports = CategoriesController;