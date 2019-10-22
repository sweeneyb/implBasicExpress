var readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout),
  prefix = '> ';

rl.on('line', function(line) {
    var split = line.split(" ")
    switch ( split[0].trim() ) {
        case 'GET':
          console.log( "get ", split[1])
          break;
        case 'PUT': 
          console.log( "put", split[1])
          break;
        default:
          console.log("unknown command")
    }
  rl.setPrompt(prefix, prefix.length);
  rl.prompt();
}).on('close', function() {
  process.exit(0);
});
// console.log(prefix);
rl.setPrompt(prefix, prefix.length);
rl.prompt();