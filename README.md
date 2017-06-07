# liveactivitymaps
Live Activity Maps for ExtraHop EDA

## Pre-install
We're using Node 6.9.4 and NPM 3.10.10 (or will be soon). For consistency, install and use `nvm` to ensure versions match:

https://github.com/creationix/nvm

#### Install `nvm`
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.bashrc
command -v nvm # should print "nvm"
```

#### Set `node` & `npm` version
```
nvm install 6.9.4
nvm use 6.9.4
node -v # should print "v6.9.4"
npm -v # should print "v3.10.10"
```

## Installation
Install npm dependencies
```
npm install
```

## Demo client

### Server
Start up `http-server` in `demo/dist`
```
npm run serve
```
https://github.com/indexzero/http-server

### Build
Run webpack build (`demo/src >> demo/dist`)
```
npm run build
```

### Watch
Run webpack build and re-run on changes
```
npm run watch
```

### Clean
Scrub out `demo/src` and `.awcache`
```
npm run clean
```
