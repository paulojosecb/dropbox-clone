import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import mainRouter from './routers/mainRouter'
import actionRouter from './routers/actionRouter'

class App {
    public express: express.Application

    constructor () {
      this.express = express()

      this.database()
      this.middlewares()
      this.routes()
    }

    private routes = (): void => {
      this.express.use(':/uid', mainRouter)
      this.express.use('/action', actionRouter)
    }

    private database = (): void => {
      mongoose.connect('mongodb://pauloAdmin:13853211b@ds331548.mlab.com:31548/dropbox-clone', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      })

      mongoose.connection.on('error', (err) => {
        console.log(err)
      })

      mongoose.connection.on('connected', () => {
        console.log('Connected to database')
      })
    }

    private middlewares = (): void => {
      this.express.use(cors)
    }
}

export default new App().express
