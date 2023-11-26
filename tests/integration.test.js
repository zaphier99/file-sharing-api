const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../app');

const uploadRouter = require('../routes/uploadRoute');
const downloadRouter = require('../routes/downloadRoute');
const deleteRouter = require('../routes/deleteRoute');

// Set up a temporary test folder
const testFolderPath = path.resolve(__dirname, 'test-uploads');

// Routers
app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);
app.use('/delete', deleteRouter);

// This is where to store the keys for reuse
let uploadedKeys;

// Set the test folder path
process.env.FOLDER = testFolderPath;

const generateTempFile = () => {
    const tempFilePath = path.join(testFolderPath, 'test-file.txt');
    fs.writeFileSync(tempFilePath, 'This is a test file.');
    return tempFilePath;
};

beforeAll(() => {
    if (!fs.existsSync(testFolderPath)) {
        fs.mkdirSync(testFolderPath);
    }
});

afterAll(() => {
    if (fs.existsSync(testFolderPath)) {
        fs.rmdirSync(testFolderPath, { recursive: true });
    }
});

describe('File Operations', () => {
    it('should upload a file', async () => {
        const response = await supertest(app)
            .post('/upload')
            .attach('file', generateTempFile());

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('File uploaded successfully');
        expect(response.body.keys).toBeTruthy();

        uploadedKeys = response.body.keys;
    });

    it('should download a file', async () => {
        expect(uploadedKeys).toBeTruthy();

        const response = await supertest(app).get(`/download/${uploadedKeys.publicKey}`);
        expect(response.status).toBe(200);
    });

    it('should delete a file', async () => {
        expect(uploadedKeys).toBeTruthy();

        const responseDelete = await supertest(app).delete(`/delete/${uploadedKeys.privateKey}`);
        expect(responseDelete.status).toBe(200);
        expect(responseDelete.body.message).toBe('File removed successfully');
    });
});