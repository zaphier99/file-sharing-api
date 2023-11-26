const FileAccessProvider = require('../../components/storage-providers/fileAccessProvider');

describe('FileAccessProvider', () => {
    let fileAccessProvider;

    beforeEach(() => {
        fileAccessProvider = new FileAccessProvider();
    });

    test('storeFile throws an error', () => {
        expect(() => {
            fileAccessProvider.storeFile();
        }).toThrowError('Method not implemented');
    });

    test('deleteFile throws an error', () => {
        expect(() => {
            fileAccessProvider.deleteFile();
        }).toThrowError('Method not implemented');
    });

    test('findFile throws an error', () => {
        expect(() => {
            fileAccessProvider.findFile();
        }).toThrowError('Method not implemented');
    });

    test('getFileStream throws an error', () => {
        expect(() => {
            fileAccessProvider.getFileStream();
        }).toThrowError('Method not implemented');
    });

    test('downloadFileStream throws an error', () => {
        expect(() => {
            fileAccessProvider.downloadFileStream();
        }).toThrowError('Method not implemented');
    });
});