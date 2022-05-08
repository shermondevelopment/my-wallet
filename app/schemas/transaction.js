import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  description: { type: String, required: true },
  user_id_transaction: { type: String, required: true },
  is_entry: { type: Boolean, required: true },
  date_movimentation: { type: Date, default: Date.now }
})

const modelTransaction = mongoose.model('transactions', transactionSchema)

export default modelTransaction