// This is a helper for determining MIME type of a specific file
const getMimeType = (fileExtension) => {
    switch (fileExtension.toLowerCase()) {
        case 'pdf':
            return 'application/pdf';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        default:
            return 'application/octet-stream';
    }
};

module.exports = { getMimeType };