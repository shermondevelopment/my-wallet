import express, { json } from 'express'

/* connect mongoose */
import connect from './setting/connect-db.js'

/* router */
import router from '../app/routes/index.js'

/* cors */
import cors from 'cors'

/* server */
const app = express()
app.use(cors())
app.use(json())
app.use(router)

connect.then(  _ => {
 app.listen(5555, () => console.log('app running 🚀🚀🚀'))
} ).catch(() => console.log('Ops... falha na conexão com o banco de dados 😵😵😵😵❌❌❌'))