GLOBAL.OPTIONS = require('./default.js').getConfig({
  serverConfig: {
    port: 8002,
    MATH_PROGRAM: 'Macaulay2',
    MATH_PROGRAM_COMMAND: 'export WWWBROWSER=/usr/bin/open; ' +
    'export PATH=/usr/bin:$PATH; ' +
    'M2 --print-width 100',
    CONTAINERS: '../lib/sshDockerContainers.js'
  },
	perContainerResources: {
	    cpuShares: 2,
	    memory: 512
	},
        hostConfig: {
            minContainerAge: 30,
            maxContainerNumber: 20,
	}
});

var Macaulay2Server = require('../lib/index.js').mathServer();
Macaulay2Server.listen();
