import 'express-async-errors'
import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { routes } from './routes'
import { connect } from "./database/connect"
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())


connect()

app.use(routes)
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(400).json({
    status: 'Error',
    message: err.message,
  })
}
app.use(errorHandler)

app.listen(3333, () => console.log('Server is running on port 3333'))