import { IUser } from '../interfaces/user.interface';
import { Euser } from '../interfaces/user.interface';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
const UserSchema = new Schema<IUser>({
	username: { type: String, required: true },
	password: { type: String, required: true },
	address: { type: String, default: '' },
	usertype: { type: String, default: Euser.user },
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		validate(val: string) {
			if (!validator.isEmail(val)) {
				throw new Error(`email is not valid`);
			}
		}
	}
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified) next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods = {
	authenticate: async function (password: string) {
		return await bcrypt.compare(password, this.password);
	}
};

const UserModel = model('User', UserSchema);

export default UserModel;
