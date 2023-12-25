import authMiddleware from '../http/middlewares/auth.middleware';
import AuthController from '../http/controllers/auth.controllers';
import { Routes } from '../interfaces/routes.interface';
import { Router } from 'express';

export class AuthRoutes implements Routes {
	path = '/auth';
	router: Router = Router();
	private authController = new AuthController();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes(): void {
		this.router.post(`${this.path}/signup`, this.authController.signupCtrl);
		this.router.post(`${this.path}/signin`, this.authController.signinCtrl);
		this.router.get(`${this.path}/getuser`, authMiddleware, this.authController.getUser);
	}
}
