import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';

class AdminController {
	async createProduct(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}
export default AdminController;
