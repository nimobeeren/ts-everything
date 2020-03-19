const ESLint = require('./.eslintrc.js');

// Use the rules for Prettier from ESLint configuration
module.exports = ESLint.rules['prettier/prettier'][1];
