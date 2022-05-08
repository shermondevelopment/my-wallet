/* userModel */
import userModel from '../schemas/user.js'

const authUser = async (req, res, next) => {

  /* verify if user provided token */

  if(!req.headers.token) {
    return res.status(422).json({ error: 'token não fornecido' })
  }

  /* verify if token is valid */
  const user = await userModel.findOne({ token: req.headers.token })

  if(!user) {
    return res.status(401).json({ error: 'token inválido' })
  }

  if(user.token !== req.headers.token) {
    return res.status(401).json({ error: 'token expirou, tente fazer login novamente!' })
  }

  res.locals.user = user

  next()

}

export default authUser