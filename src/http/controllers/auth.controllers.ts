import { DATABASE } from '../../schema';
import { HttpException } from '../exceptions/http.exceptions';
import { Request, Response, NextFunction } from 'express';
class AuthController {
	async signupCtrl(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, username, password } = req.body;
			if (!email || email.trim() === '') throw new HttpException(400, 'email is not found');
			if (!password || password.trim() === '') throw new HttpException(400, 'password is not found');
			if (!username || username.trim() === '') throw new HttpException(400, 'username is not found');
			const existUser = await DATABASE.userSchema.findOne({ email });
			console.log('existUser: ', existUser);

			if (!!existUser) throw new HttpException(400, 'User with same email address is presents');
			const newUser = await DATABASE.userSchema.create({
				email,
				username,
				password
			});
			return res.status(200).json({ user: newUser, message: 'This user is already presents' });
		} catch (error: any) {
			console.log(error);
			next(error);
		}
	}
}

export default AuthController;
