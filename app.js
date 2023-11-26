// Libraries
require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
// Routes
const uploadRoute = require('./routes/uploadRoute');
const downloadRoute = require('./routes/downloadRoute');
const deleteRoute = require('./routes/deleteRoute');

// Middlewares
const rateLimiter = require('./middlewares/rate-limiter');
require('./middlewares/cleanup');

const port = process.env.PORT || 3000;
const uploadFolder = process.env.FOLDER || 'uploads';

const folderPath = path.resolve(__dirname, uploadFolder);

try {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
} catch (err) {
    console.error('Error creating the upload folder:', err);
}

app.use(`/${uploadFolder}`, express.static(uploadFolder));
app.use(rateLimiter);

app.use('/files/upload', uploadRoute);
app.use('/files/download', downloadRoute);
app.use('/files/delete', deleteRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;