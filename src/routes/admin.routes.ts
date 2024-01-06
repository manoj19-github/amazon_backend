import authMiddleware from '@/http/middlewares/auth.middleware';
import adminController from '../http/controllers/admin.controllers';
import { Routes } from '../interfaces/routes.interface';
import { Router } from 'express';
import adminMiddleware from '@/http/middlewares/admin.middleware';

export class adminRoutes implements Routes {
	path = '/admin';
	router: Router = Router();
	private adminController = new adminController();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes(): void {
		this.router.post(`${this.path}/product/create`, authMiddleware, adminMiddleware, this.adminController.createProduct);
	}
}
