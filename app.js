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
        request.baseUrl = path
        let response = {}
        handler(request, response)
    }
}

// above this comment is "framework" stuff.  It handles common tasks
// below this comment is configuring the framework & specifying what gets done.

function doRoot(request, response) {
    console.log("get root\n\n", request.baseUrl);
}

function doGet2(request, response) {
    console.log("get2\n\n", request.baseUrl);
}
get("/", doRoot)
get("/get2", doGet2)

// this is starting to look a lot like express
put("/", function doPut(request, response) {
    console.log("put", request.baseUrl)
})