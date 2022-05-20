'use strict'

const privateRoute = async (fastify, options) => {
  fastify.get('/', { preValidation: [fastify.jwtAuthentication] }, async (request, reply) => {
    reply.headers({
      'Content-Type': 'application/json'
    })
    reply.status(200).send({ hello: 'private' })
  })
}

export default privateRoute
