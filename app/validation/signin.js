import Joi from 'joi'

const signinValidation = Joi.object({
  email: Joi.string().trim().required().error((errors) =>  new Error('por favor insira um e-mail!')),
  password: Joi.string().trim().required().error((errors) =>  new Error('por favor insira uma senha!')),
})

export default signinValidation