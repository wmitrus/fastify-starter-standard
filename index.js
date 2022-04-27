import Fastify from 'fastify'
import { createRequire } from 'module'
import helmet from '@fastify/helmet'

const fastify = Fastify({
  logger: true
})

const require = createRequire(import.meta.url)
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
fastify.register(require('@fastify/swagger'), {
  exposeRoute: true,
  routePrefix: '/docs'
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
