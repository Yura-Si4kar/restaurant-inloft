const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors({ origin: '*' }));

app.get('/user', (req, res) => {
    if (req.method === 'GET') {
        res.json({ name: 'Yura', surname: 'Sichkar' });
    } else {
        res.json({ message: 'Проблем!!!' });
    }
})

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));