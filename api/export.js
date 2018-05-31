const json2csv = require('json2csv').parse

const Response = require('../models/response')
const strategies = require('../data/strategies')

module.exports = (request, reply) => {
  Response.find((err, responses) => {
    if (err) {
      return reply(err)
    }

    const fieldNames = [
      'id',
      'timestamp',
      'ip',
      'userAgent'
    ].concat(strategies.map(strategy => strategy.key))

    return json2csv(responses, {fields: fieldNames}, (err, csv) => {
      if (err) {
        return reply(err)
      }

      return reply(csv).header('content-type', 'text/csv').header('content-disposition', 'attachment; filename=responses.csv')
    });
  });
}
