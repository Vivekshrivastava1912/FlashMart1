import {Router} from 'express'
import { registerUserController } from '../controllers/user.controller.js'
import { verifyEmailController } from '../controllers/user.controller.js'
import { loginController } from '../controllers/user.controller.js'
import { logoutController } from '../controllers/user.controller.js'
import auth from '../middleware/auth.js';



//------------------------------------------------all routs are define hear-----------------------------------------------------------------//


const userRouter = Router()

userRouter.post('/register',registerUserController)

userRouter.post('/verify-email',verifyEmailController)

userRouter.post('/login',loginController)

userRouter.get('/logout',auth,logoutController)

export default userRouter