GLOBAL.OPTIONS = require('./default.js').getConfig({
  serverConfig: {
    port: 8002,
    MATH_PROGRAM: 'Singular',
    MATH_PROGRAM_COMMAND: 'Singular',
    CONTAINERS: '../lib/LocalContainerManager.js'
  }
});

console.log(GLOBAL.OPTIONS);

var SingularServer = require('../lib/index.js').mathServer();
SingularServer.listen();