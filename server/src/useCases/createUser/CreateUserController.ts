import { Request, Response } from "express";
import { IUser } from "../../interfaces/User";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request<{}, {}, IUser>, res: Response) {
    if(!req.body) {
      throw new Error('Missing body of request')
    }
    const { username, name, password, email } = req.body

    const authenticateUserUseCase = new CreateUserUseCase()

    const user = await authenticateUserUseCase.execute({
      username,
      name,
      password,
      email
    })

    return res.json(user)
  }
}

export { CreateUserController }