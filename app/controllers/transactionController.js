/* model transaction */
import modelTransaction from '../schemas/transaction.js'

/* validate data transaction */
import transactionValidate from '../validation/transaction.js'

/* utils */
import  validation from '../utils/error-message.js'


export const listTransaction = async (req, res) => {
  try {
  
    const { _id } = res.locals.user

    const transaction = await modelTransaction.find({ user_id_transaction: _id })

    res.status(201).json(transaction)


  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

export const listTransactionById = async (req, res) => {
  try {
  
    const { _id } = res.locals.user
    const { idTransaction } = req.params

    const transaction = await modelTransaction.findOne({ user_id_transaction: _id,  _id: idTransaction  }, )

    if(!transaction) {
      return res.status(404).json({ message: 'transação não encontrada' })
    }

    res.status(200).json(transaction)

  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

export const addEntry = async (req, res) => {
  try {
    const { value, description } = req.body

    const { _id } = res.locals.user

    const isNotValid = await validation({value, description}, transactionValidate)

    if(isNotValid) {
      return res.status(422).json({ error: isNotValid })
    }

    await modelTransaction.create({ value, description, user_id_transaction: _id,  is_entry: true })

    res.status(201).json({ sucess: 'transação efetuada com sucesso!' })


  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

export const exitMoney = async (req, res) => {
  try {
    const { value, description } = req.body

    const { _id } = res.locals.user

    const isNotValid = await validation({value, description}, transactionValidate)

    if(isNotValid) {
      return res.status(422).json({ error: isNotValid })
    }

    await modelTransaction.create({ value, description, user_id_transaction: _id,  is_entry: false })

    res.status(201).json({ sucess: 'transação efetuada com sucesso!' })


  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'internal server error' })
  }
} 

export const deleteTransaction = async  (req, res) => {
    try {
      const { idTransaction } = req.params
      const { _id } = res.locals.user

      const deleted = await modelTransaction.deleteOne({ _id: idTransaction }, { user_id_transaction: _id })
      
      if(deleted.deletedCount < 1) {
        return res.status(422).json({ error: 'transação não encontrada, tente novamente'})
      }

      res.status(200).json({message: true})
    } catch (error) {
      res.status(500).json({ error: 'internal server error' })
    }
}

export const editTransaction = async  (req, res) => {
  try {
    const { idTransaction } = req.params
    const { _id } = res.locals.user

    const updated = await modelTransaction.updateOne({ _id: idTransaction }, { ...req.body })

    if(updated.modifiedCount < 1) {
      return res.status(422).json({ error: 'transação não atualizada, tente novamente'})
    }

    res.status(200).json({message: true})
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}