const { v4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const Models = require('../models/model');
const ApiError = require('../error/ApiError');
const sharp = require('sharp');

class MenuItemsController {
    constructor(category) {
        this.Model = Models[category];
    }
    
    async create(req, res, next) {
        try {
            if (req.files) {
                let { img } = req.files;
                console.log(img);
                let fileName = v4() + '.jpg';
    
                sharp(img.data)
                .jpeg({ quality: 80 })
                .toFile(path.resolve(__dirname, '..', 'static', fileName), (err, info) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(info);
                    }
                });
    
                const list = new this.Model({ ...req.body, img: fileName });
                const result = await list.save();
    
                res.status(201).json(result);    
            } else {
                const list = new this.Model(req.body);
                const result = await list.save();
    
                res.status(201).json(result);    
            }
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const list = await this.Model.find().sort({ name: 1 });

            if (!list || list.length === 0) {
                return next(ApiError.notFound('Elements not found'));
            }

            res.status(200).json(list);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const doc = await this.Model.findById(req.params.id);

            if (!doc) {
                return next(ApiError.notFound('Element not found'));
            }

            res.status(200).json(doc);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async updateOne(req, res, next) {
        try {
            const result = await this.Model.findByIdAndUpdate(req.params.id, req.body);

            if (!result) {
                return next(ApiError.notFound('Element not found'));
            }

            res.status(200).json(result);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            let result = await this.Model.findById(req.params.id);

            if (!result) {
                return next(ApiError.notFound('Element not found'));
            }

            if (result.img) {
                const imagePath = path.resolve(__dirname, '..', 'static', result.img);
                
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }                
            }

            const deletedResult = await this.Model.findByIdAndDelete(req.params.id);

            res.status(200).json(deletedResult);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = MenuItemsController;