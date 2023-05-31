const {Router} = require('express');
const {readdirSync, statSync} = require('fs');
const {join} = require('path');

function loadRoutes(router, directory) {
	const files = readdirSync(directory);

	files.forEach(file => {
		filePath = join(directory, file);
		stats = statSync(filePath);

		if (stats.isDirectory()) {
			const subRouter = Router({ mergeParams: true });
			loadRoutes(subRouter, filePath);

			let fileName = file
			if(fileName.startsWith('[') && fileName.endsWith(']')) fileName = `:${fileName.slice(1, -1)}`

			console.log(fileName);
			router.use(`/${fileName}`, subRouter);
		} else if (file.startsWith('index.') && file.endsWith('.js')) {
			const controller = require(filePath);
			(['get', 'post', 'put', 'delete']).forEach(methodName => {
				if(typeof controller[methodName] === 'function') router[methodName]('/', controller[methodName])
				else if(typeof controller[methodName.toUpperCase()] === 'function') router[methodName]('/', controller[methodName.toUpperCase()])
			})
		}
	});
}

function dirRouter(directory) {
	const router = Router();
	loadRoutes(router, directory);
	return router;
}

module.exports = {loadRoutes, dirRouter};