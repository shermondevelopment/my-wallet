/* model user */
import user from '../schemas/user.js'

export async function userChecking(email) {
  return  await user.findOne({ email })
}