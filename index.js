import Fastify from 'fastify'
import helmet from '@fastify/helmet'
import fetch from 'node-fetch'
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

fastify.decorate('fetch', fetch)
await fastify.register(import('./src/plugins/config.js'))
fastify.register(import('./src/routes/index.js'))
fastify.register(import('@fastify/redis'), {
  host: fastify.config.get('redis.host'),
  // password: '***',
  port: fastify.config.get('redis.port'), // Redis port
  family: 4 // 4 (IPv4) or 6 (IPv6)
})
fastify.register(import('./src/api/swapi.js'), {
  prefix: '/api/v1'
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
