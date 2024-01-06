import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';

const adminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
	const loggedUser = req.user;
	if (!!loggedUser && loggedUser?.usertype === 'admin') return next();
	return res.status(403).json({
		status: false,
		message: `admin authorization required`
	});
};

export default adminMiddleware;
