import { sign } from 'jsonwebtoken'
import config from '../../config.json'
class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, config.JWT_TOKEN, {
      subject: userId,
      expiresIn: '1d'
    })
    return token
  }
}

export { GenerateTokenProvider }