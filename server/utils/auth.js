const jwt = require('jsonwebtoken');
const config = require('./../config');

function generateKey(data) {
    return jwt.sign(data, config.privateKey,{ expiresIn: config.expiresIn });
}

// async function validateKey(data) {
//     return await jwt.verify(data, config.privateKey);
// }
function validateKey(data) {
    return jwt.verify(data, config.privateKey);
}
module.exports = { generateKey, validateKey };