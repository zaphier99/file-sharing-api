const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { findFileDetails } = require('../components/helpers/findFileDetails');

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
        storageProvider = new GoogleCloudStorageProvider(config);
        break;
    default:
        storageProvider = new LocalStorageProvider(folderPath);
}

// Delete File Endpoint
router.delete('/:privateKey', async (req, res) => {
    const { privateKey } = req.params;

    storageProvider.deleteFile(privateKey)
        .then(() => {
            res.json({ message: 'File removed successfully' });
        })
        .catch(error => {
            if (error.code === 'ENOENT') {
                console.log('File not found!');
                res.status(404).json({ error: 'File not found' });
            } else {
                console.error('Error deleting file:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
});

module.exports = router;