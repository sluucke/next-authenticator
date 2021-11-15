import { IUser } from './../interfaces/User';
import mongoose from 'mongoose'
import { IUserModelInterface } from '../interfaces/UserModel';
import { IUserDoc } from '../interfaces/UserDoc';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
}, {
  timestamps: true,
})



userSchema.statics.build = (attr: IUser) => new User(attr);
const User = mongoose.model<IUserDoc, IUserModelInterface>('Users', userSchema)

export { User }
