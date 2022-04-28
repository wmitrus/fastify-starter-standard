import fp from 'fastify-plugin'
import conf from 'config'

async function config (fastify, opts) {
  fastify.decorate('config', conf)
}

export default fp(config)
