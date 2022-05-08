import Joi from 'joi'

const transactionValidate = Joi.object({
  value: Joi.number().required().error((errors) =>  new Error(errors)),
  description: Joi.string().required().trim().error((errors) =>  new Error('por favor informe descrição!'))
})


export default transactionValidate
