import { RequestWithUser } from '@/interfaces/auth.interface';
import { DATABASE } from '../../schema';
import { HttpException } from '../exceptions/http.exceptions';
import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
class AuthController {
	// sign up controller
	// input data (email,password,username)
	async signupCtrl(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, username, password } = req.body;
			// check all user input is available or not
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
	//sign in controller
	// input data (email,password)
	async signinCtrl(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			// throw error if password or email is not present
			if (!email || email.trim() === '') throw new HttpException(400, 'email is not found');
			if (!password || password.trim() === '') throw new HttpException(400, 'password is not found');

			// search if user email is exists or not
			const userExists = await DATABASE.userSchema.findOne({ email });
			if (!userExists) throw new HttpException(400, 'Email is not exists');

			// check password is valid  or not
			const isPasswordValid = await userExists.authenticate(password);
			// throw error if password is invalid
			if (!isPasswordValid) throw new HttpException(400, 'Password is incorrect');

			// create a  jsonwebtoken  to signin the user
			const jwtToken = await JWT.sign({ id: userExists._id, usertype: userExists.usertype }, process.env.JWT_SECRET!);

			return res.status(200).json({ user: userExists, token: jwtToken, message: 'Login successfull' });
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
	async getUser(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			console.log(req.user);
			const userId = req.user?.id;
			if (!userId) throw new HttpException(400, 'User not exists');
			const currUser = await DATABASE.userSchema.findById(userId);
			if (!currUser) throw new HttpException(400, 'User not found');
			return res.status(200).json({ user: currUser, message: 'Login successfull' });
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}

export default AuthController;
