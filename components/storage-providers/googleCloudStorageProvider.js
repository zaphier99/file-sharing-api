// This is where you will put methods using Google Cloud Storage as a provider
// Unfortunately, you need to bill the services to create a bucket
const { Storage } = require('@google-cloud/storage');

class GoogleCloudStorageProvider {
    constructor(config) {
        this.storage = new Storage(config);
        this.bucketName = config.bucketName;
    }

    storeFile(file, callback) {
        // A sample where you can add some logic here when store a file with Google Cloud Storage API
    }

    deleteFile(key, callback) {
        // A sample where you can add some logic here when delete a file with Google Cloud Storage API
    }

    getFileStream(key) {
        // A sample where you can add some logic here when getting a file with Google Cloud Storage API
    }

    findFile(key, callback) {
        // A sample where you can add some logic here when getting the file details with Google Cloud Storage API
    }
}

module.exports = GoogleCloudStorageProvider;