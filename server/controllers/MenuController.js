const fs = require('fs');
const path = require('path');

class MenuController {
    constructor(filePath, key) {
        this.filePath = filePath;
        this.key = key;
    }

    getAll(req, res) {
        fs.readFile(this.filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
            } else {
                const jsonData = JSON.parse(data);
                res.json(jsonData[this.key]);
            }
        });
    }

    changeOne(req, res) {
        const itemId = req.params.id;
        const newData = req.body;

        fs.readFile(this.filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error changing file:', err);
                res.status(500).send('Internal Server Error');
            } else {
                const jsonData = JSON.parse(data);
                const index = jsonData[this.key].findIndex((item) => item.id === itemId);

                if (index !== -1) {
                    // Змінити об'єкт з вказаним ID на нові дані
                    jsonData[this.key][index] = { ...jsonData[this.key][index], ...newData };

                    // Записати змінені дані назад у файл
                    fs.writeFile(this.filePath, JSON.stringify(jsonData, null, 2), (err) => {
                        if (err) {
                            console.error('Error writing file:', err);
                            res.status(500).send('Internal Server Error');
                        } else {
                            // Повернути змінений об'єкт як відповідь на запит
                            res.json(jsonData[this.key][index]);
                        }
                    });
                } else {
                    // Якщо об'єкт з вказаним ID не знайдено, повернути помилку
                    res.status(404).json({ error: 'Item not found' });
                }
            }
        });
    }
}

module.exports = MenuController;