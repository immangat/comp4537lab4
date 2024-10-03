const userStrings = require('./lang/en/en');
const utils = require('./modules/utils');
const http = require('http');
const {IO, LocalWriter, LocalReader} = require("./modules/io");


class App {
    constructor(port, toggleBucket, filepath) {
        this.port = port;
        this.initApp(toggleBucket, filepath)
        this.numberOfRequests = 0
    }

    initApp(toggleBucket, filepath) {
        this.io = toggleBucket ? new IO() : new IO(new LocalWriter(), new LocalReader(), filepath);
    }


    // Method to handle root URL
    handleRoot(req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(userStrings.messages.defaultRootMessage);
    }

    handleAPI(req, res) {
        if (req.method === 'GET' && req.url.startsWith('/api/definitions')) {
            console.log(req.url);
            const word = utils.utils.getParam(req, 'word')
            if (!word) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    message: userStrings.messages.wordNotFound
                }));
            } else {
                try {
                    const definition = this.io.getDefinition(word);
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        word: word, definition: definition,
                    }));
                } catch (error) {
                    console.log(error)
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        message: `Did not find ${word} definitions`
                    }));
                }

            }
        } else if (req.method === 'POST' && req.url.startsWith('/api/definitions')) {
            let body = ''
            req.on('data', chunk => {
                body += chunk;
            })
            req.on('end', () => {
                try {
                    const jsonData = JSON.parse(body); // Parse the JSON
                    console.log('Received JSON:', jsonData);
                    const {word, definition} = jsonData
                    this.io.addDefinition(word, definition);
                    // Send a response
                    this.numberOfRequests++;
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: `Request #${this.numberOfRequests}\nNew entry recorded\n${word}:${definition}`}));

                } catch (error) {
                    // Handle JSON parsing errors
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: error.toString()}));
                }
            })
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end(userStrings.messages.badRequest);
        }
    }

    handleRequests(req, res) {
        if (req.method === 'OPTIONS') {
            res.writeHead(200);  // Respond with HTTP 200 OK status
            res.end();
            return;
        }

        if (req.url === "/") {
            this.handleRoot(req, res);
        } else if (req.url.startsWith("/api")) {
            this.handleAPI(req, res);
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end(userStrings.messages.badRequest);
        }

    }

    start() {
        const sever = http.createServer((req, res) => this.handleRequests(req, res))
        sever.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        })
    }
}


// Instantiate and start the server
const PORT = process.env.PORT || 8080;

// if bucket will be used
const toggleBucket = process.env.TOGGLE_BUCKET || false;

const filepath = process.env.FILEPATH || "./data/dictionary.json"
const myApp = new App(PORT, toggleBucket, filepath);
myApp.start();
