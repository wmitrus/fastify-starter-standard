const swapi = async (fastify, options) => {
  fastify.get('/swapi', async (request, reply) => {
    return { hello: 'swapi' }
  })

  fastify.get('/swapi/films', async (request, reply) => {
    return { hello: 'films' }
  })

  fastify.get('/swapi/planets', async (request, reply) => {
    return { hello: 'planets' }
  })
}

export default swapi
