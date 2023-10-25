const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'api', 'bbqs.json');

class bbqsController {
    async getAll(req, res) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
            } else {
                const jsonData = JSON.parse(data);
                res.json(jsonData.bbqs);
            }
        });
    }

    async changeOne(req, res) {
        const itemId = req.params.id;
        const newData = req.body;

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error changing file:', err);
                res.status(500).send('Internal Server Error');
            } else {
                const jsonData = JSON.parse(data);
                const index = jsonData.bbqs.findIndex((item) => item.id === itemId);

                if (index !== -1) {
                    // Змінити об'єкт з вказаним ID на нові дані
                    jsonData.bbqs[index] = { ...jsonData.bbqs[index], ...newData };

                    // Записати змінені дані назад у файл
                    fs.writeFileSync(filePath, JSON.stringify(jsonData));

                    // Повернути змінений об'єкт як відповідь на запит
                    res.json(jsonData.bbqs[index]);
                } else {
                    // Якщо об'єкт з вказаним ID не знайдено, повернути помилку
                    res.status(404).json({ error: 'Item not found' });
                }
            }
        });
    }
}

module.exports = new bbqsController();