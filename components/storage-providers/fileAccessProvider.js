// This is the collective methods for storage providers
// Returns error if a storage provider doesn't use the indicated methods here
class FileAccessProvider {
    storeFile(file, callback) {
        throw new Error('Method not implemented');
    }

    deleteFile(key, callback) {
        throw new Error('Method not implemented');
    }

    findFile(key, callback) {
        throw new Error('Method not implemented');
    }

    getFileStream(key) {
        throw new Error('Method not implemented');
    }

    downloadFileStream(key) {
        throw new Error('Method not implemented');
    }
}

module.exports = FileAccessProvider;