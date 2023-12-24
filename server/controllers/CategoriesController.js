const Models = require('../models/model');
const ApiError = require('../error/ApiError');

class CategoriesController {
    constructor(category) {
        this.Model = Models[category];
    }
    
    async getAll(req, res, next) {
        const url = req.originalUrl;
        let { search, page, limit } = req.query;
        page = page !== undefined ? parseInt(page, 10) : 1;
        limit = limit !== undefined ? parseInt(limit, 10) : 12;
        search = search || '';

        if (url.includes('/foods')) {
            const result = [];
            delete Models.Personnels;
            delete Models.Tables;
            delete Models.Sales;
            const promises = Object.values(Models).map(async (Model) => {
                try {
                    const data = await Model.find().sort({ name: 1 });
                    result.push(...data);
                } catch (error) {
                    return next(ApiError.internal(error.message));
                }
            });

            await Promise.all(promises);

            const filteredResult = result.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name));

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + parseInt(limit, 10);

            const collection = filteredResult.slice(startIndex, endIndex);

            // Отримати загальну кількість записів для розрахунку загальної кількості сторінок
            const totalItems = filteredResult.length;

            // Обчислити загальну кількість сторінок
            const total = Math.ceil(totalItems / limit);

            res.status(200).json({ collections: collection, total });
        } else {
            this.Model
                .find({ name: { $regex: new RegExp(search, 'i') } })
                .sort({ name: 1 })
                .then((filteredData) => {
                    const totalElements = filteredData.length;
                    const total = Math.ceil(totalElements / limit);

                    // Застосовуємо обмеження та сторінку до відфільтрованої колекції
                    this.Model
                        .find({ name: { $regex: new RegExp(search, 'i') } })
                        .sort({ name: 1 })
                        .limit(parseInt(limit, 10))
                        .skip((page - 1) * limit)
                        .then((collection) => {
                            res.status(200).json({ collections: collection, total });
                        })
                        .catch((e) => {
                            next(ApiError.internal(e.message));
                        });
                })
                .catch((e) => {
                    next(ApiError.internal(e.message));
                });
        }
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
        const { rate } = req.body;

        if (rate) {
            try {
                const result = await this.Model.findById(req.params.id);

                // Оновлюємо кількість голосів та суму рейтингів
                result.count += 1;
                result.totalRating += rate;

                // Розраховуємо середній рейтинг
                result.rate = result.totalRating / result.count;

                // Зберігаємо оновлені дані
                await result.save();

                res.status(200).json(result);
            } catch (error) {
                next(ApiError.internal(error.message));
            }
        } else {
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
}

module.exports = CategoriesController;