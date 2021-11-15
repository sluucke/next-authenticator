import { ResolveTokenProvider } from "../../providers/ResolveTokenProvider"

class DataUserUseCase {
  async execute(token: string) {
    if (!token) {
      throw new Error('Token is missing')
    }
    const resolveTokenProvider = new ResolveTokenProvider()
    const user = await resolveTokenProvider.execute(token)
    return user
  }
}

export { DataUserUseCase }