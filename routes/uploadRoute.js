const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const LocalStorageProvider = require('../components/storage-providers/localStorageProvider');
const GoogleCloudStorageProvider = require('../components/storage-providers/googleCloudStorageProvider');

const uploadFolder = process.env.FOLDER || 'uploads';
const folderPath = path.resolve(__dirname, uploadFolder);

// Set storage provider to use
let storageProvider;
const storageProviderType = process.env.STORAGE_PROVIDER || 'local';

switch (storageProviderType) {
    case 'local':
        storageProvider = new LocalStorageProvider(folderPath);
        break;
    case 'google':
        // Replace config with your Google Cloud Storage configuration
        storageProvider = new GoogleCloudStorageProvider(config);
        break;
}

// Setup for handling file uploads
const storage = multer.diskStorage({
    destination: folderPath,
    filename: (req, file, cb) => {
        const publicKey = crypto.randomBytes(16).toString('hex');
        const privateKey = crypto.randomBytes(32).toString('hex');
        const fileName = publicKey + '-' + privateKey + path.extname(file.originalname);
        cb(null, fileName);

        // Include the generated keys in the response
        req.generatedKeys = { publicKey, privateKey };
    },
});

const upload = multer({ storage });

// Upload File Endpoint
router.post('/', upload.single('file'), (req, res) => {
    const { publicKey, privateKey } = req.generatedKeys;
    res.json({ message: 'File uploaded successfully', keys: { publicKey, privateKey } });
});

module.exports = router;