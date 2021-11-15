import { User } from "../../database/models";
import { IUser } from "../../interfaces/User";
import { hash } from 'bcryptjs'
import { NextFunction } from "express";
import { IUserDoc } from "../../interfaces/UserDoc";
class CreateUserUseCase {
  async execute({ name, username, password, email }: IUser) {
    const userExists = await User.findOne({ username: username })
    if(userExists) {
      throw new Error('User already exists!')
    }
    const passwordHash = await hash(password, 8)
    const user = new User({
      
      name,
      username,
      password: passwordHash,
      email
    }).save()

    
    return user;
  }
}

export { CreateUserUseCase }