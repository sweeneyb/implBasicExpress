var readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout),
  prefix = 'FOO> ';


  // derived from https://gist.github.com/initlove/2478016
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
handlers["GET"] = {}

function get( path, getFn) {
    let paths = handlers["GET"]
    paths[path] = getFn
}
function put(putFn) { 
    handlers["PUT"] = putFn
}

function doStuff(line) {
    var split = line.split(" ")
    switch ( split[0].trim() ) {
        case 'GET':
          let paths = handlers["GET"]
          var handler = paths[split[1]]
          if(handler == undefined) {
              console.log("404 - not found")
          } else {
             handler(split[1])
          }
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

function doRoot(what) {
    console.log("get root\n\n", what);
}

function doGet2(what) {
    console.log("get2\n\n", what);
}
get( "/", doRoot)
get("/get2", doGet2)

// this is starting to look a lot like express
put(function doPut(what) {
    console.log("put", what)
})
