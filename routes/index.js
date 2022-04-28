// function indexRoute (fastify, options, done) {
//   fastify.get('/', async (request, reply) => {
//     return { hello: 'world' }
//   })

//   done()
// }

const indexRoute = (fastify, options, done) => {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  done()
}

export default indexRoute
