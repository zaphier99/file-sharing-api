const fs = require('fs');
const path = require('path');
const { findFileDetails } = require('../helpers/findFileDetails');
const FileAccessProvider = require('./fileAccessProvider');
const uploadFolder = process.env.FOLDER || 'uploads';

class LocalStorageProvider extends FileAccessProvider {
    constructor(folderPath) {
        super();
        this.folderPath = folderPath;
    }

    // Store File Method for Local
    storeFile() {
        // A sample where you can add some logic here when uploading a file
        // But since we're using Multer as a File Storage Handler for local, this is no longer needed
    }
    
    // Delete File Method for Local
    deleteFile(key) {
        const filePath = this.findFilePath(key)

        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    getFileStream() {
        // A sample where you can add some logic here when getting a file
        // But since we're using Multer as a File Storage Handler for local, this is no needed
    }

    // Download File Method for Local
    downloadFileStream(key) {
        const filePath = this.findFilePath(key)
        
        return new Promise((resolve, reject) => {
            const fileStream = fs.createReadStream(filePath);
            
            fileStream.on('error', (error) => {
                reject(error);
            });
            
            fileStream.on('open', () => {
                resolve(fileStream);
            });
        });
    }

    // Method for searching the file path provided by either a private or public key
    findFilePath(key) {
        const { fileName, fileExtension } = findFileDetails(key);
        const basePath = path.resolve(__dirname, uploadFolder);
        const filePath = path.resolve(__dirname, basePath, `${fileName}.${fileExtension}`);

        return filePath
    }
}

module.exports = LocalStorageProvider;