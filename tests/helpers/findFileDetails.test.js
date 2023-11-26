const fs = require('fs');
const { findFileDetails } = require('../../components/helpers/findFileDetails');

jest.mock('fs');

describe('findFileDetails', () => {
    const mockFiles = ['file1.txt', 'file2.jpg', 'file3.png'];
    const mockKey = 'file2';

    beforeAll(() => {
        fs.readdirSync.mockReturnValue(mockFiles);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('should find file details for a matching key', () => {
        const result = findFileDetails(mockKey);

        // Assertions
        expect(result).toEqual({
            fileName: 'file2',
            fileExtension: 'jpg',
        });
    });

    test('should return null for a non-matching key', () => {
        const result = findFileDetails('nonexistent');

        // Assertions
        expect(result).toBeNull();
    });

    test('should handle key with multiple matches', () => {
        const result = findFileDetails('file');

        // Assertions
        expect(result).not.toBeNull();
        expect(result.fileName).toBeDefined();
        expect(result.fileExtension).toBeDefined();
    });
});