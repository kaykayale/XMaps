import express from 'express'
import cors from 'cors'
import { router } from './src/routes/routes'
require('dotenv/config')
const port = process.env.PORT ?? 2020
const app = express()

app.use(cors())
app.use(express.json()) // SEMPRE LEMBRAR DESSA PORCARIA ANTES DE QUALQUER UTILIZAÇÃO DO REQUEST

app.use(router)

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
