import { Router } from 'express'


const router = Router()

/* middlewares */
import authUser from '../middlewares/auth.js'

/* controllers */
import signupController from '../controllers/signupController.js'
import signinController from '../controllers/signinController.js'

import { addEntry, exitMoney } from '../controllers/transactionController.js'


/* signup */
router.post('/signup', signupController)

/* signin */
router.post('/signin', signinController)

/* transaction */
router.post('/transaction/entry', authUser, addEntry)
router.post('/transaction/exit', authUser, exitMoney)

export default router