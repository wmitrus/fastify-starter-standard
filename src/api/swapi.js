const swapi = async (fastify, options) => {
  fastify.get('/swapi', async (request, reply) => {
    const response = await fastify.fetch('https://swapi.dev/api/')
    const json = await response.json()
    reply.send(json)
  })

  fastify.get('/swapi/films', async (request, reply) => {
    const response = await fastify.fetch('https://swapi.dev/api/films')
    const json = await response.json()
    reply.send(json)
  })

  fastify.get('/swapi/films/:id', async (request, reply) => {
    const id = request.params.id
    const response = await fastify.fetch('https://swapi.dev/api/films/' + id)
    const json = await response.json()
    reply.send(json)
  })

  fastify.get('/swapi/planets', async (request, reply) => {
    const response = await fastify.fetch('https://swapi.dev/api/planets')
    const json = await response.json()
    reply.send(json)
  })

  fastify.get('/swapi/planets/:id', async (request, reply) => {
    const id = request.params.id
    const response = await fastify.fetch('https://swapi.dev/api/planets/' + id)
    const json = await response.json()
    reply.send(json)
  })
}

export default swapi
