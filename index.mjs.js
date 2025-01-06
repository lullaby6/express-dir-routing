import { Router } from 'express';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

async function loadRoutes(router, directory) {
	const files = await readdir(directory);

	files.forEach(async file => {
		const filePath = join(directory, file);
		const stats = await stat(filePath);

		if (stats.isDirectory()) {
			const subRouter = Router({ mergeParams: true });
			loadRoutes(subRouter, filePath);

			const fileName = file.replaceAll('$', ':');;

			router.use(`/${fileName}`, subRouter);

			return;
		}

		if (!file.endsWith('.js') && !file.endsWith('.ts')) return;

		const fileName = file.split('.')[0].toLowerCase();

		if (fileName !== 'get' && fileName !== 'post' && fileName !== 'put' && fileName !== 'delete' && fileName !== 'patch') return;

		const controller = await import(filePath);

		if (typeof controller !== 'function') return;

		router[fileName]('/', controller);
	});
}

function dirRouter(directory) {
	const router = Router();
	loadRoutes(router, directory);
	return router;
}

export default { loadRoutes, dirRouter }