'use strict'

import Fastify from 'fastify'
import moment from 'moment'

// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)

const TODAY = moment(new Date().getTime()).format('YYYY-MM-DD')

const loggerConf = {
  level: 'info',
  timestamp: () => {
    const TS_HMS = new Date().toISOString()
    return ', "time":"' + TS_HMS + '"'
  },
  file: `logs/main-${TODAY}.log`,
  mkdir: true,
  redact: ['req.headers.authorization'],
  formatters: {
    level: label => {
      return { level: label }
    }
  }
}

const fastify = Fastify({
  logger: loggerConf
})

await fastify.register(import('./app.js'))

await fastify.ready().then(() => {
  fastify.log.info('Successfully booted!')
}, (err) => {
  fastify.log.error('An error happened!', err)
  fastify.log.error(err)
})

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
