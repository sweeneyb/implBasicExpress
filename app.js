var readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout),
  prefix = 'OHAI> ';

rl.on('line', function(line) {
    var split = line.split(" ")
    switch ( split[0].trim ) {
        case 'GET':
          console.log( "get ", split[1])
          break;
        case 'PUT': 
          console.log( "put", split[1])
          break;
        default:
          console.log("unknown command")
    }
    // split.forEach(element => {
    //     console.log(element)
    // });
//   switch(line.trim()) {
//     case 'hello':
//       console.log('world!');
//       break;
//     default:
//       console.log('Say what? I might have heard `' + line.trim() + '`');
//       break;
//   }
  rl.setPrompt(prefix, prefix.length);
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});
console.log(prefix + 'Good to see you. Try typing stuff.');
rl.setPrompt(prefix, prefix.length);
rl.prompt();