const fs = require('fs').promises;

class MenuController {
    constructor(filePath, key) {
        this.filePath = filePath;
        this.key = key;
    }

    async getAll(req, res) {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            const jsonData = JSON.parse(data);
            res.json(jsonData[this.key]);
        } catch (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
        }
    }

    async changeOne(req, res) {
        const itemId = Nember(req.params.id);
        const newData = req.body;

        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            const jsonData = JSON.parse(data);
            const index = jsonData[this.key].findIndex(item => item.id === itemId);

            if (index !== -1) {
                jsonData[this.key][index] = { ...jsonData[this.key][index], ...newData };
                await fs.writeFile(this.filePath, JSON.stringify(jsonData, null, 2));
                res.json(jsonData[this.key][index]);
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
        } catch (err) {
            console.error('Error changing file:', err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = MenuController;