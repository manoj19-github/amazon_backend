import { Routes } from '../interfaces/routes.interface';
import { Application } from 'express';
import { AuthRoutes } from './auth.routes';

class RoutesMain {
	private routes: Routes[] = [new AuthRoutes()]; // add all routes  here
	constructor() {}
	public initializeAllRoutes(app: Application) {
		this.routes.forEach((route) => {
			app.use('/api/', route.router);
		});
	}
}

export default RoutesMain;
