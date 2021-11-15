import mongoose from 'mongoose'
export interface IUserDoc extends mongoose.Document {
  "name": string;
  "username": string;
  "password": string;
  "email": string;
}