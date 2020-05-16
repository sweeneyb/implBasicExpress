const express = require('express')
const app = express()
const port = 3000
app.listen(port)

var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout),
    prefix = '> ';


// derived from https://gist.github.com/initlove/2478016
rl.on('line', function (line) {
    doStuff(line)
    rl.setPrompt(prefix, prefix.length);
    rl.prompt();
}).on('close', function () {
    process.exit(0);
});
rl.setPrompt(prefix, prefix.length);
rl.prompt();

var handlers = {}
handlers["GET"] = {}
handlers["PUT"] = {}

function get(path, getFn) {
    let paths = handlers["GET"]
    paths[path] = getFn
}

function put(path, putFn) {
    handlers["PUT"][path] = putFn
}

function doStuff(line) {
    var split = line.split(" ")
    switch (split[0].trim()) {
        case 'GET':
            deferRequest("GET", split[1])
            break
        case 'PUT':
            deferRequest("PUT", split[1])
            break
        default:
            console.log("unknown command")
    }
}

function deferRequest(method, path) {
    let paths = handlers[method]
    var handler = paths[path]
    if (handler == undefined) {
        console.log("404 - not found")
    } else {
        let request = {}
        request.route = {}
        request.route.path = path
        let response = {
            rc: undefined,
            message: undefined,
            status: function(code) {
                console.log("accepting code " +code)
                this.rc = code

                return this
            },
            send: function( message ) {
                this.message = message
            }
        }
        handler(request, response)
        console.log(response.rc, " ", response.message, "\n\n")
    }
}

// above this comment is "framework" stuff.  It handles common tasks
// below this comment is configuring the framework & specifying what gets done.

function doRoot(request, response) {
    response.status(200).send("get root")
}

function doGet2(request, response) {
    response.status(200).send("get2: " + request.route.path);
}
get("/", doRoot)
get("/get2", doGet2)
app.get('/', doRoot)
app.get("/get2", doGet2)



// this is starting to look a lot like express
put("/", function doPut(request, response) {
    response.status(200).send("put "+ request.route.path)
})
app.post("/", function doPut(request, response) {
    response.status(200).send("put "+ request.route.path)
})

