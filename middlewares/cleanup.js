// This is a middleware that will delete a file if it passes it's inactivity period 
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

// Set upload folder path
const uploadFolder = path.resolve(__dirname, process.env.FOLDER || 'uploads');

// Set period of inactivity
const inactivityPeriod = process.env.INACTIVITY_PERIOD || 5; // Default: 5 minutes

// Schedule clean up
cron.schedule('* * * * *', () => {
    console.log('Running cleanup job...');

    // Get the current timestamp
    const currentTime = Date.now();

    // Read all files in the upload folder
    fs.readdirSync(uploadFolder).forEach((file) => {
        const filePath = path.join(uploadFolder, file);

        // Get the file's last modification time
        const fileStats = fs.statSync(filePath);
        const lastModifiedTime = fileStats.mtime.getTime();

        // Calculate time difference
        const timeDifferenceInMinutes = (currentTime - lastModifiedTime) / (1000 * 60);

        // Check if the file has been inactive
        if (timeDifferenceInMinutes > inactivityPeriod) {
            // Delete the file
            fs.unlinkSync(filePath);
            console.log(`Deleted inactive file: ${file}`);
        }
    });

    console.log('Cleanup job completed.');
});

exports.cleanupFunction = () => { };