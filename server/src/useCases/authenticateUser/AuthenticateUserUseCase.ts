import { compare } from "bcryptjs";
import { NextFunction } from "express";
import { User } from "../../database/models";
import { IUser } from "../../interfaces/User";
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";

interface IRequest {
  username: string;
  password: string;
}
class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    const userExists = await User.findOne({ username: username })
    if (!userExists) {
      throw new Error('User or password incorrect!')
    }

    const passwordMatch = await compare(password, userExists.password)
    if (!passwordMatch) {
      throw new Error('Username or password is incorrect')
    }
    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(userExists._id.toString())

    return token
  }
}

export { AuthenticateUserUseCase }