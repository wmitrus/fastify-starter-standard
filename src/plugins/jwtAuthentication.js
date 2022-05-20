import fp from 'fastify-plugin'

const auth = async (fastify, opts) => {
  const authenticate = async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      fastify.log.error(err)
      reply.send(err)
    }
  }

  fastify.decorate('jwtAuthentication', authenticate)
}

export default fp(auth)
