const express = require('express');
const cors = require('cors');
const router = require('./router');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', router);

// Прослуховування порту
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
