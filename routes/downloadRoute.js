const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { findFileDetails } = require('../components/helpers/findFileDetails');
const { getMimeType } = require('../components/helpers/getMimeType');
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
    default:
        storageProvider = new LocalStorageProvider(folderPath);
}

// Download File Endpint 
router.get('/:publicKey', async (req, res) => {
    const { publicKey } = req.params;

    const { fileName, fileExtension } = findFileDetails(publicKey);
    const mimeType = getMimeType(fileExtension);

    try {
        const fileStream = await storageProvider.downloadFileStream(publicKey)
        if (fileStream) {
            // Set the headers for downloading
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}.${fileExtension}`);
            res.setHeader('Content-Type', mimeType);

            // Pipe the file stream to the response
            fileStream.pipe(res);

        } else {
            console.log('File not found!');
            res.status(404).json({ error: 'File not found' });
        }
        
    } catch (error) {
        console.error('Error downloading file:', error);
        console.error(error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;