import fp from 'fastify-plugin'

const swapiController = async (fastify, options) => {
  const swapi = {
    getSwapi: async (request, reply) => {
      try {
        const { redis } = fastify
        const key = 'test'
        const cache = await redis.get(key)

        if (!cache) {
          fastify.log.debug("Couldn't find a value in cache. Fetching data from api.")
          const response = await fastify.fetch('https://swapi.dev/api/')
          const json = await response.json()

          redis.set(request.query.key, JSON.stringify(json), 'EX', 60 * 5)
          reply.send(json)
        } else {
          fastify.log.info('Got a value from cache key: ', key)
          reply.send(JSON.parse(cache))
        }
      } catch (err) {
        fastify.log.error(err)
        reply.send(err)
      }
    },
    getFilms: async (request, reply) => {
      try {
        const { redis } = fastify
        const key = request.url
        const cache = await redis.get(key)

        if (!cache) {
          fastify.log.info("Couldn't find a value in cache. Fetching data from api.")
          const response = await fastify.fetch('https://swapi.dev/api/films')
          const json = await response.json()
          redis.set(key, JSON.stringify(json), 'EX', 60 * 5)
          reply.send(json)
        } else {
          fastify.log.info({ msg: 'Got a value from cache.', key })
          reply.send(JSON.parse(cache))
        }
      } catch (err) {
        fastify.log.error(err)
      }
    },

    getFilm: async (request, reply) => {
      try {
        const { redis } = fastify
        const key = request.url
        const id = request.params.id
        const cache = await redis.get(key)

        if (!cache) {
          fastify.log.info("Couldn't find a value in cache. Fetching data from api.")
          const response = await fastify.fetch('https://swapi.dev/api/films/' + id)
          const json = await response.json()
          redis.set(key, JSON.stringify(json), 'EX', 60 * 5)
          reply.send(json)
        } else {
          fastify.log.info('Got a value from cache key: ', key)
          reply.send(JSON.parse(cache))
        }
      } catch (err) {
        fastify.log.error(err)
      }
    },

    getPlanets: async (request, reply) => {
      const { redis } = fastify
      const key = request.url
      const cache = await redis.get(key)

      if (!cache) {
        fastify.log.info("Couldn't find a value in cache. Fetching data from api.")
        const response = await fastify.fetch('https://swapi.dev/api/planets')
        const json = await response.json()
        redis.set(key, JSON.stringify(json), 'EX', 60 * 5)
        reply.send(json)
      } else {
        fastify.log.info('Got a value from cache key: ', key)
        reply.send(JSON.parse(cache))
      }
    },

    getPlanet: async (request, reply) => {
      const { redis } = fastify
      const key = request.url
      const id = request.params.id

      const cache = await redis.get(key)

      if (!cache) {
        fastify.log.info("Couldn't find a value in cache. Fetching data from api.")
        const response = await fastify.fetch('https://swapi.dev/api/planets/' + id)
        const json = await response.json()
        redis.set(key, JSON.stringify(json), 'EX', 60 * 5)
        reply.send(json)
      } else {
        fastify.log.info('Got a value from cache key: ', key)
        reply.send(JSON.parse(cache))
      }
    }
  }

  fastify.decorate('swapi', swapi)
}

export default fp(swapiController)
