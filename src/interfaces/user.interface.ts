export enum Euser {
	user = 'user',
	admin = 'admin'
}
export interface IUser {
	username: string;
	password: string;
	email: string;
	address: string;
	usertype: Euser;
}
