# express-dir-routing

A routing system for express.js using directories like NextJS 13 or SvelteKit!

# Installation

```sh
npm install express-dir-routing
```

# Usage

```
routes
├── index.js
├── users
│   ├── index.js
│   └── [username]
│       └── index.js
└── products
    └── index.js
        └── [id]
            └── index.js
```

also you can rename index.js files with index.user.js or index.products.js:

```
routes
├── index.js
├── users
│   ├── index.users.js
│   └── [username]
│       └── index.users-username.js
└── products
    └── index.products.js
        └── [id]
            └── index.products-id.js
```

```js
// app.js
const express = require('express')
const path = require('path')
const {dirRouter} = require('express-dir-routing');

const app = express();

app.use('/', dirRouter(path.join(__dirname, 'routes')));
```

```js
// routes -> users -> index.users.js
function get(req, res){
    res.send('GET user');
}

function post(req, res){
    res.send('CREATE user');
}

module.exports = {
    get,
    post
}
```

and you can get URL params naming a directory with [] like "[username]"

```js
// routes -> users -> [username] -> index.users-username.js
function get(req, res){
    const {username} = req.params;
    res.send(`GET user ${username}`);
}

module.exports = {
    get
}
```