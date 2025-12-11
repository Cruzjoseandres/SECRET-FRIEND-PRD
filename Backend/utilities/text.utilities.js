const bcrypt = require('bcrypt');

// exports.generateFileName = (extension) => {
//     const crypto = require("crypto");
//     return crypto.randomUUID() + "." + extension;
// }
exports.generateAuthToken = (salt) => {
    return bcrypt.hash(salt + new Date().getTime(), 10);
}