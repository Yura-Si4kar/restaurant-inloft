const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Обробник GET запитів
app.get('/api/data', (req, res) => {
    // Логіка для обробки GET запиту
    res.json({ message: 'GET request successful' });
});

// Обробник POST запитів
app.post('/api/data', (req, res) => {
    // Логіка для обробки POST запиту
    res.json({ message: 'POST request successful', data: req.body });
});

// Обробник PUT запитів
app.put('/api/data', (req, res) => {
    // Логіка для обробки PUT запиту
    res.json({ message: 'PUT request successful', data: req.body });
});

// Обробник DELETE запитів
app.delete('/api/data', (req, res) => {
    // Логіка для обробки DELETE запиту
    res.json({ message: 'DELETE request successful' });
});

// Прослуховування порту
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
