import { Router } from 'express'


const router = Router()

/* middlewares */
import authUser from '../middlewares/auth.js'

/* controllers */
import signupController from '../controllers/signupController.js'
import signinController from '../controllers/signinController.js'

import { addEntry, exitMoney, deleteTransaction } from '../controllers/transactionController.js'


/* signup */
router.post('/signup', signupController)

/* signin */
router.post('/signin', signinController)

/* transaction */
router.post('/transaction/entry', authUser, addEntry)
router.post('/transaction/exit', authUser, exitMoney)
router.delete('/transaction/delete/:idTransaction', authUser, deleteTransaction)

export default router