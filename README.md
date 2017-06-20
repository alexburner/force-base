# Force Base
TypeScript + WebWorker + D3 Force Layout

## Pre-install
We're using Node 8.1.2 and NPM 5.0.3

For consistency, install and use `nvm` to ensure versions match:

#### Install `nvm`
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.bashrc
command -v nvm # should print "nvm"
```

#### Set `node` & `npm` version
```
nvm install 8.1.2
nvm use 8.1.2
node -v # should print "v8.1.2"
npm -v # should print "v5.0.3"
```

## Installation
Install npm dependencies
```
npm install
```

## Demo client

### Watch
Run webpack dev server (serves on http://localhost:8080)
```
npm run watch
```

### Build
Run webpack build (`demo` → `docs`)
```
npm run build
```

### Clean
Scrub out `docs` and `.awcache`
```
npm run clean
```
