import Fastify from 'fastify'
import helmet from '@fastify/helmet'
import config from './plugins/config.js'

// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)

const fastify = Fastify({
  logger: true
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

fastify.register(config)
fastify.register(import('./routes/index.js'))

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
