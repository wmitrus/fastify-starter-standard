const privateRoute = async (fastify, options) => {
  fastify.get('/private', { preValidation: [fastify.jwtAuthentication] }, async (request, reply) => {
    reply.headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + 'test123!@#'
    })
    reply.status(200).send({ hello: 'world' })
  })
}

export default privateRoute
