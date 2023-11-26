// This is a helper for searching file path provided by either a private or public key
const fs = require('fs');
const path = require('path');

const uploadFolder = process.env.FOLDER || 'uploads';
const folderPath = path.resolve(__dirname, uploadFolder);

const findFileDetails = (key) => {
    // Read all files in the folder
    const files = fs.readdirSync(folderPath);

    // Find the file that matches the key
    const matchingFile = files.find((file) => file.includes(key));

    // If a matching file is found, extract and return the fileName and fileExtension
    if (matchingFile) {
        const [fileName, fileExtension] = matchingFile.split('.');
        return { fileName, fileExtension };
    }

    // If no matching file is found, return null or any default value
    return null;
};

module.exports = { findFileDetails };