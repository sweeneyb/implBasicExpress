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

function doStuff(line) {
    var split = line.split(" ")
    switch ( split[0].trim() ) {
        case 'GET':
          doGet(split[1].trim())
          break
        case 'PUT': 
          doPut(split[1].trim())
          break
        default:
          console.log("unknown command")
    }
}

function doGet(what) {
    console.log("get", what);
}

function doPut(what) {
    console.log("put", what)
}

