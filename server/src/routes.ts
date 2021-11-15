import { Router } from 'express'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController'
import { CreateUserController } from './useCases/createUser/CreateUserController'
import { DataUserController } from './useCases/dataUser/DataUserController'


const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const dataUserController = new DataUserController()
router.post('/users', createUserController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/users/me', ensureAuthenticated, dataUserController.handle)

router.get('/users/me/courses', ensureAuthenticated, (req, res) => {
  return res.json([
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'SQL' },
    { id: 4, name: 'Ethical Hacking' },
    { id: 5, name: 'Cyber Security' }
  ])
})

export { router as routes }