import { Request, Response } from "express";
import { DataUserUseCase } from "./DataUserUseCase";

class DataUserController {
  async handle(req: Request, res: Response) {
    const authToken = req.headers.authorization
    const [, token] = (authToken || '').split(' ')

    const dataUserUseCase = new DataUserUseCase()
    const user = await dataUserUseCase.execute(token)

    res.json(user)
  }
}

export { DataUserController }