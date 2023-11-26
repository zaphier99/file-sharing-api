const fs = require('fs');
const LocalStorageProvider = require('../../components/storage-providers/localStorageProvider');

describe('LocalStorageProvider', () => {
    let localStorageProvider;

    beforeEach(() => {
        localStorageProvider = new LocalStorageProvider('testFolderPath');
    });

    test('storeFile calls without error', () => {
        expect(() => {
            localStorageProvider.storeFile();
        }).not.toThrow();
    });

    test('deleteFile calls fs.unlink', async () => {
        const mockFindFilePath = jest.spyOn(localStorageProvider, 'findFilePath');
        mockFindFilePath.mockReturnValue('mockedFilePath');

        const mockUnlink = jest.spyOn(fs, 'unlink');
        mockUnlink.mockImplementation((path, callback) => callback(null));

        await localStorageProvider.deleteFile('mockedKey');

        expect(mockFindFilePath).toHaveBeenCalledWith('mockedKey');
        expect(mockUnlink).toHaveBeenCalledWith('mockedFilePath', expect.any(Function));
    });

    test('downloadFileStream resolves with a readable stream when the file exists', async () => {
        const mockFindFilePath = jest.spyOn(localStorageProvider, 'findFilePath');
        mockFindFilePath.mockReturnValue('mockedFilePath');

        fs.writeFileSync('mockedFilePath', 'This is a test file.');

        const mockCreateReadStream = jest.spyOn(fs, 'createReadStream');
        const result = await localStorageProvider.downloadFileStream('mockedKey');

        // Expectations
        expect(mockFindFilePath).toHaveBeenCalledWith('mockedKey');
        expect(mockCreateReadStream).toHaveBeenCalledWith('mockedFilePath');
        expect(result instanceof fs.ReadStream).toBe(true);

        fs.unlinkSync('mockedFilePath');
    });

    test('downloadFileStream rejects with an error when the file does not exist', async () => {
        const mockFindFilePath = jest.spyOn(localStorageProvider, 'findFilePath');
        mockFindFilePath.mockReturnValue('nonExistentFilePath');

        await expect(localStorageProvider.downloadFileStream('mockedKey')).rejects.toThrowError();
        expect(mockFindFilePath).toHaveBeenCalledWith('mockedKey');
    });

    // Clear mocks after test
    afterEach(() => {
        jest.restoreAllMocks();
    });
});