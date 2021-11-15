import mongoose from 'mongoose'
import { IUser } from './User';
import { IUserDoc } from './UserDoc';
export interface IUserModelInterface extends mongoose.Model<IUserDoc> {
  build(attr: IUserDoc): IUser;
}