const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        // Assign response chunks to body
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        // Buffer response chunks
	    // We return req.on in order to avoid executing the last lines before we execute the redirection
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString(); // We know that the body is text
            const message = parsedBody.split('=')[1];
            // writeFileSync method blocks code execution of the next line of code until the file is created
            // In case the message is too big then this would block other users from using the server
            // since writeFileSync would block execution until it finishes#
            // For this reason we use writeFile
            // The callback function that makes the redirection of the writeFile will be executed once execution finishes
            // Example of asynchronous concept of NodeJS
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.JS Server!</h1></body>');
    res.write('</html>');
    // res.write('This will cause an error cause res.end() was called');
});

server.listen(3000);