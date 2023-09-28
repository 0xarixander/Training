const fs = require('fs');

console.log('Hello, Creating file...');
fs.writeFileSync('hello.txt', 'Hello from Node.js');