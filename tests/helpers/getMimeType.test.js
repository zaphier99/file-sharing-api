const { getMimeType } = require('../../components/helpers/getMimeType');

describe('getMimeType', () => {
    test('should return correct MIME type for PDF', () => {
        const result = getMimeType('pdf');
        expect(result).toBe('application/pdf');
    });

    test('should return correct MIME type for JPEG', () => {
        const result = getMimeType('jpg');
        expect(result).toBe('image/jpeg');
    });

    test('should return correct MIME type for PNG', () => {
        const result = getMimeType('png');
        expect(result).toBe('image/png');
    });

    test('should return correct MIME type for JPEG', () => {
        const result = getMimeType('JPEG');
        expect(result).toBe('image/jpeg');
    });

    test('should return default MIME type for unknown extension', () => {
        const result = getMimeType('txt');
        expect(result).toBe('application/octet-stream');
    });
});