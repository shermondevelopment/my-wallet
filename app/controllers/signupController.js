/* utils */
import  validation from '../utils/error-message.js'

/* validationSchmea */
import signupValidation from '../validation/signup.js'

/* utils checking user exists */
import { userChecking } from '../utils/userChecking.js'

/* userModel */
import userModel from '../schemas/user.js'

/* bcrypt */
import bcrypt from 'bcrypt'

/* uuid */
import { v4 as uuidv4 } from 'uuid'


const signupController = async (req, res) => {
  try {

    const { password, password_confirm, email, name } = req.body

    const isValid = await validation({name, email, password, password_confirm}, signupValidation)

    if(isValid) {
      return res.status(422).json({ error: isValid })
    }

    if(await userChecking(email)) {
      return res.status(409).json({ error: 'email já cadastrado!'})
    }

    if(password !== password_confirm) {
      return res.status(422).json({ error: 'senhas não corresponde'})
    }

    const token = uuidv4()

    await userModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      token
    })

    res.status(201).json({ name, token: token })
    

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'internal server error' })
  }
}

export default signupController