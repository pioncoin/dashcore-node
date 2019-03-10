Pioncore Node
============

A Pion full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [Pion Core (Piond) v0.12.1.x](https://github.com/pioncoin/pion) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

```bash
git clone https://github.com/pioncoin/pioncore-node
cd pioncore-node
./bin/pioncore-node start
```

When running the start command, it will seek for a .pioncore folder with a pioncore-node.json conf file.
If it doesn't exist, it will create it, with basic task to connect to piond.

Some plugins are available :

- Insight-API : `./bin/pioncore-node addservice pioncoin/insight-api`
- Insight-UI : `./bin/pioncore-node addservice pioncoin/insight-ui`

You also might want to add these index to your pion.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install pioncore-node
```

```javascript
const pioncore = require('pioncore-node');
const config = require('./pioncore-node.json');

let node = pioncore.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //Pion core started
    piond.on('tx', function(txData) {
        let tx = new pioncore.lib.Transaction(txData);
    });
});
```

## Prerequisites

- Pion Core (piond) (v0.12.1.x) with support for additional indexing *(see above)*
- Node.js v0.10, v0.12, v4 or v5
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

Pioncore includes a Command Line Interface (CLI) for managing, configuring and interfacing with your Pioncore Node.

```bash
pioncore-node create -d <pion-data-dir> mynode
cd mynode
pioncore-node install <service>
pioncore-node install https://github.com/yourname/helloworld
pioncore-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [Pion Core](https://github.com/pioncoin/pion/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/pioncoin/insight-api-pion/tree/master)
- [Insight UI](https://github.com/pioncoin/insight-ui-pion/tree/master)
- [Bitcore Wallet Service](https://github.com/pioncoin/pioncore-wallet-service/tree/master)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [Piond](docs/services/piond.md) - Interface to Pion Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a piond node already runing `piond --daemon`.

Pioncore-node : `git clone https://github.com/pioncoin/pioncore-node -b develop`
Insight-api (optional) : `git clone https://github.com/pioncoin/insight-api-pion -b develop`
Insight-UI (optional) : `git clone https://github.com/pioncoin/insight-ui-pion -b develop`

Install them :
```
cd pioncore-node && npm install \
 && cd ../insight-ui && npm install \
 && cd ../insight-api && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api
npm link ../insight-ui
```

Start with `./bin/pioncore-node start` to first generate a ~/.pioncore/pioncore-node.json file.
Append this file with `"pioncoin/insight-ui-pion"` and `"pioncoin/insight-api-pion"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/pioncoin/pioncore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/pioncoin/pioncore-node/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)
