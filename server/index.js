const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers');
const errorHandler = require('./middlewares/ErrorHandlingMiddleware');
const connectToDb = require('./db');
const cors = require('cors');

const PORT = 3001;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/', router);

app.use(errorHandler);
    
const start = async () => {
    try {
        await connectToDb();
        app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();