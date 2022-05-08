import Joi from 'joi'

const signupValidation = Joi.object({
  name: Joi.string().trim().required().error((errors) =>  new Error('por favor insira um nome!')),
  email: Joi.string().trim().required().error((errors) =>  new Error('por favor insira um e-mail!')),
  password: Joi.string().trim().required().error((errors) =>  new Error('por favor insira uma senha!')),
  password_confirm: Joi.string().trim().required().error((errors) =>  new Error('por favor confirme a senha!'))
})


export default signupValidation

