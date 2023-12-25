import { NextFunction, Response } from 'express';
import { DATABASE } from '../../schema';
import JWT from 'jsonwebtoken';
import { RequestWithUser } from '../../interfaces/auth.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
	if (req.headers?.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			const userToken = req.headers.authorization.split(' ')[1];
			if (userToken) {
				const decoded: any = JWT.verify(userToken, process.env.JWT_SECRET!);

				req.user = decoded;
				next();
			} else {
				return res.status(403).json({
					status: false,
					message: `please login first then try`
				});
			}
		} catch (err) {
			console.log(`signin jsonwebtoken error :`);
			return res.status(403).json({
				status: false,
				message: `verification error ${err}`
			});
		}
	} else {
		return res.status(403).json({
			status: false,
			message: `authorization required`
		});
	}
};

export default authMiddleware;
