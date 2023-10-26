const fs = require('fs').promises;

class MenuItemsController {
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

    async create(req, res) {
        const newData = req.body;

        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const jsonData = JSON.parse(data);
            jsonData[this.key].push({id: Date.now(), ...newData});

            await fs.writeFile(this.filePath, JSON.stringify(jsonData, null, 2));
            res.json(newData);
        } catch (err) {
            console.error('Error creating item:', err);
            res.status(500).send('Internal Server Error');
        }
    }

    async changeOne(req, res) {
        const itemId = Number(req.params.id);
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

    async delete(req, res) {
        const itemId = Number(req.params.id);

        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            const jsonData = JSON.parse(data);
            const index = jsonData[this.key].findIndex(item => item.id === itemId);

            if (index !== -1) {
                const deletedItem = jsonData[this.key].splice(index, 1)[0];
                await fs.writeFile(this.filePath, JSON.stringify(jsonData, null, 2));
                res.json(deletedItem);
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
        } catch (err) {
            console.error('Error deleting item:', err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = MenuItemsController;