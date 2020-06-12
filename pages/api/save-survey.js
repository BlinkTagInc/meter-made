const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const Survey = require('../../models/survey')
const strategies = require('../../data/strategies')

export default async (request, response) => {
  if (request.method === 'POST') {
    const date = new Date()
    const ip = request.headers['x-forwarded-for']
    const id = `${ip}-${Date.now()}`

    const survey = {
      id,
      timestamp: date.toISOString(),
      ip,
      userAgent: request.headers['user-agent'],
      language: request.body.language
    }

    strategies.forEach(strategy => {
      console.log(request.body)
      survey[strategy.key] = parseInt(request.body[strategy.key], 10)
    })

    console.log(survey)

    const result = new Survey(survey)
    await result.save()

    response.status(200).json({ status: 'success', id })
  } else {
    response.status(404).end()
  }
}
