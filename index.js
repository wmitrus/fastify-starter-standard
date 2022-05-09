import Fastify from 'fastify'
import autoload from '@fastify/autoload'
import helmet from '@fastify/helmet'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fetch from 'node-fetch'
import moment from 'moment'

// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
fastify.register(helmet, {
  global: true,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['\'self\''],
      styleSrc: ['\'self\'', '\'unsafe-inline\''],
      imgSrc: ['\'self\'', 'data:', 'validator.swagger.io'],
      scriptSrc: ['\'self\'', 'https: \'unsafe-inline\'']
    }
  }
})

fastify.register(import('@fastify/swagger'), {
  exposeRoute: true,
  routePrefix: '/docs'
})

fastify.decorate('fetch', fetch)

// await fastify.register(import('./src/plugins/config.js'))
await fastify.register(autoload, {
  dir: join(__dirname, './src/plugins'),
  ignorePattern: /.*test.js/
})

fastify.register(import('@fastify/redis'), {
  host: fastify.config.get('redis.host'),
  // password: '***',
  port: fastify.config.get('redis.port'), // Redis port
  family: 4 // 4 (IPv4) or 6 (IPv6)
})

fastify.register(autoload, {
  dir: join(__dirname, './src/routes'),
  ignorePattern: /.*test.js/
})

fastify.register(autoload, {
  dir: join(__dirname, './src/api'),
  ignorePattern: /.*test.js/,
  dirNameRoutePrefix: function rewrite (folderParent, folderName) {
    if (folderParent.includes('api') && folderName === 'v1') {
      return 'api/v1'
    }
    if (folderParent.includes('api') && folderName === 'v2') {
      return 'api/v2'
    }
    return folderName
  }
})

await fastify.ready().then(() => {
  fastify.log.info('Successfully booted!')
}, (err) => {
  fastify.log.error('An error happened!', err)
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
