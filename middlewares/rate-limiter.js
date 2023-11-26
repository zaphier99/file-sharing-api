// This is a helper that will limit the number of requests from the API
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: process.env.RATE_LIMIT_MAX || 20, // limit each IP to configurable number of requests
});

module.exports = limiter;