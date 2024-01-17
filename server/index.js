require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectToDb = require('./db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routers');
const ErrorHandlingMiddleware = require('./middlewares/ErrorHandlingMiddleware');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(fileUpload({}));

app.use('/', router);

const staticPath = path.resolve(__dirname, 'static');

if (!fs.existsSync(staticPath)) {
    fs.mkdirSync(staticPath);
}

app.use(express.static(staticPath));

app.use(ErrorHandlingMiddleware);
    
const start = async () => {
    try {
        await connectToDb();
        app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();