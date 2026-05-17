// Shared in-memory signal store for serverless functions
// Note: This resets on cold starts. For persistence, use a database.
const signals = [];

module.exports = { signals };
