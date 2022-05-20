
const signup = async (fastify, options) => {
  const signupOpts = {

    handler: async (request, reply) => {
      const token = fastify.jwt.sign({ payload: 'RANDOM' })
      reply.status(200).send({ token })
    }
  }

  fastify.get('/signup', signupOpts)
}

export default signup
