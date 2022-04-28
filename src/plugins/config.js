import config from 'config'

async function plugin (fastify, opts) {
  // your plugin code
  fastify.decorate('config', config)
}

export default plugin
