var readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout),
  prefix = '> ';

rl.on('line', function(line) {
  doStuff(line)
  rl.setPrompt(prefix, prefix.length);
  rl.prompt();
}).on('close', function() {
  process.exit(0);
});
rl.setPrompt(prefix, prefix.length);
rl.prompt();

var handlers = {}

function get( getFn) {
    handlers["GET"] = getFn
}
function put(putFn) { 
    handlers["PUT"] = putFn
}

function doStuff(line) {
    var split = line.split(" ")
    switch ( split[0].trim() ) {
        case 'GET':
          var hanlder = handlers["GET"]
          hanlder(split[1])
          break
        case 'PUT': 
          handlers["PUT"](split[1])
          break
        default:
          console.log("unknown command")
    }
}

// above this comment is "framework" stuff.  It handles common tasks
// below this comment is configuring the framework & specifying what gets done.

function doGet(what) {
    console.log("get", what);
}
get(doGet)

// this is starting to look a lot like express
put(function doPut(what) {
    console.log("put", what)
})
