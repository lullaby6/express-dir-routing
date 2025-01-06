# express-dir-routing

A file-based routing system for `express.js` using directories like `NextJS 13` or `SvelteKit`!

# Installation

```sh
npm install express-dir-routing
```

# Usage

```
routes
├── get.js
├── users
│   ├── get.js
│   ├── post.js
│   └── $username
│       └── get.js
└── products
    └── get.js
    └── post.js
    └── put.js
    └── delete.js
        └── $id
            └── get.js
```

also you can rename `get.js` files with `get.user.js` or `get.products.js`:

```
routes
├── get.js
├── users
│   ├── get.users.js
│   └── [username]
│       └── get.users-username.js
└── products
    └── get.products.js
        └── [id]
            └── get.products-id.js
```

```js
// app.js
const express = require('express')
const path = require('path')
const { dirRouter } = require('express-dir-routing');

const app = express();

app.use('/', dirRouter(path.join(__dirname, 'routes')));
```

```js
// routes -> users -> get.users.js
function controller(req, res){
    res.send('GET user');
}

module.exports = controller
```

and you can get URL params naming a directory with $ like "$username"

```js
// routes -> users -> $username -> get.users-username.js
function controller(req, res){
    const {username} = req.params;

    res.send(`GET user ${username}`);
}

module.exports = controller
```

# License

MIT