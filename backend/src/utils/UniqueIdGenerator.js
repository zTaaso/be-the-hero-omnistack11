const crypto = require('crypto');

module.exports = function UniqueIdGenerator() {
    return crypto.randomBytes(4).toString('HEX');
}