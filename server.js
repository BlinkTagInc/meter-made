const next = require('next')
const Hapi = require('hapi')
const HapiBasicAuth = require('hapi-auth-basic')
const HapiRequireHttps = require('hapi-require-https')
const Good = require('good')
const mongoose = require('mongoose')
const {nextHandlerWrapper} = require('./next-wrapper')

const dev = process.env.NODE_ENV !== 'production'
require('dotenv').config()

const app = next({dev})
const port = process.env.PORT || 3000
const server = new Hapi.Server({
  port
})

// Use native promises
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

const responseHandler = require('./api/response')
const exportResponses = require('./api/export')

// Add request logging (optional)
const pluginOptions = [
  {
    register: Good,
    options: {
      reporters: {
        console: [{
          module: 'good-console'
        }, 'stdout']
      }
    }
  }
]

const validate = (request, username, password, cb) => {
  const credentials = {id: 'blinktag', name: 'blinktag'}
  const isValid = username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD
  cb(null, isValid, credentials)
}

app.prepare()
.then(async () => {
  await server.register(HapiBasicAuth)

  server.auth.strategy('simple', 'basic', {validate})

  if (process.env.NODE_ENV === 'production') {
    await server.register({
      plugin: HapiRequireHttps,
      options: {}
    })
  }

  server.route({
    method: 'POST',
    path: '/api/response',
    handler: responseHandler
  })

  server.route({
    method: 'GET',
    path: '/export',
    config: {auth: 'simple'},
    handler: exportResponses
  })

  server.route({
    method: 'GET',
    path: '/{p*}', /* Catch all route */
    handler: nextHandlerWrapper(app)
  })

  try {
    await server.start()
    console.log(`> Ready on http://localhost:${port}`)
  } catch (err) {
    console.log('Error starting server')
    console.log(err)
  }
})
