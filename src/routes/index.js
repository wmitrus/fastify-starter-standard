const indexRoute = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}

export default indexRoute
