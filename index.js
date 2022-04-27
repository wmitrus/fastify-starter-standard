import Fastify from 'fastify'
import { createRequire } from 'module'

const fastify = Fastify({
  logger: true
})

const require = createRequire(import.meta.url)

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
