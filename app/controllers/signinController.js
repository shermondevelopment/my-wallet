/* userModel */
import userModel from '../schemas/user.js'

/* validation */
import signinValidation from '../validation/signin.js'

/* utils */
import  validation from '../utils/error-message.js'

/* utils checking user exists */
import { userChecking } from '../utils/userChecking.js'

/* uuid */
import { v4 as uuidv4 } from 'uuid'

/* bcrypt */
import bcrypt from 'bcrypt'


const signinController = async (req, res) => {
  try {
    const { email, password } = req.body

    const inputNotValid = await validation({email, password}, signinValidation)

    if(inputNotValid) {
      return res.status(422).json({ error: inputNotValid })
    }

    const userExists = await userChecking(email)

    if(!userExists) {
      return res.status(404).json({ error: 'Usuário não cadastrado!' })
    }

    const token = uuidv4()
    
    await userModel.findByIdAndUpdate({ _id: userExists._id }, {token})

    if(!(await bcrypt.compare(password, userExists.password))) {
      return res.status(404).json({ error: 'E-mail e/ou senha não batem.' })
    }

  
    res.status(200).json({ name: userExists.name, token: token })
    

  } catch(error) {
    console.log(error)
    res.status(500).json({ error: 'internval server error'})
  }
}

export default signinController