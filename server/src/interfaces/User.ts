import mongoose from "mongoose";

export interface IUser {
  "_id"?: mongoose.Types.ObjectId;
  "name": string;
  "username": string;
  "password": string;
  "email": string;
}