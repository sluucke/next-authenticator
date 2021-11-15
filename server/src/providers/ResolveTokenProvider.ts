import { verify } from "jsonwebtoken";
import config from '../../config.json'
import { User } from "../database/models";
import { IUser } from "../interfaces/User";
class ResolveTokenProvider {
  async execute(token: string) {
    const userId = verify(token, config.JWT_TOKEN)
    if (!userId) {
      throw new Error('Token is invalid')
    }
    try {
      const user = await User.findOne({ '_id': userId.sub })
      
      const username = user?.username
      const email = user?.email
      return { username, email }
    } catch(err) {
      throw new Error('User invalid')
    }
  }
}

export { ResolveTokenProvider }