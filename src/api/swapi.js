const swapiOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          films: { type: 'string' },
          people: { type: 'string' },
          planets: { type: 'string' },
          species: { type: 'string' },
          starships: { type: 'string' },
          vehicles: { type: 'string' }
        }
      }
    }
  }
}

const FilmItem = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    episode_id: { type: 'number' },
    opening_crawl: { type: 'string' },
    director: { type: 'string' },
    producer: { type: 'string' },
    release_date: { type: 'string' },
    characters: {
      type: 'array',
      items: { type: 'string' }
    },
    planets: {
      type: 'array',
      items: { type: 'string' }
    },
    starships: {
      type: 'array',
      items: { type: 'string' }
    },
    vehicles: {
      type: 'array',
      items: { type: 'string' }
    },
    species: {
      type: 'array',
      items: { type: 'string' }
    },
    created: { type: 'string' },
    edited: { type: 'string' },
    url: { type: 'string' }
  }
}

const swapiFilmsOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          count: { type: 'number' },
          next: { type: 'null' },
          previous: { type: 'null' },
          results: {
            type: 'array',
            items: FilmItem
          }
        }
      }
    }
  }
}

const swapiFilmItem = {
  schema: {
    response: {
      200: FilmItem
    }
  }
}

const swapiPlanetItem = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    rotation_period: { type: 'string' },
    orbital_period: { type: 'string' },
    diameter: { type: 'string' },
    climate: { type: 'string' },
    gravity: { type: 'string' },
    terrain: { type: 'string' },
    surface_water: { type: 'string' },
    population: { type: 'string' },
    residents: {
      type: 'array',
      items: { type: 'string' }
    },
    films: {
      type: 'array',
      items: { type: 'string' }
    },
    created: { type: 'string' },
    edited: { type: 'string' },
    url: { type: 'string' }
  }
}

const swapiPlanetsOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          count: { type: 'string' },
          next: { type: 'string' },
          previous: { type: 'null' },
          results: {
            type: 'array',
            items: swapiPlanetItem
          }
        }
      }
    }
  }
}

const swapiPlanetItemOpts = {
  schema: {
    response: {
      200: swapiPlanetItem
    }
  }
}

const swapi = async (fastify, options) => {
  fastify.get('/swapi', swapiOpts, async (request, reply) => {
    try {
      const { redis } = fastify
      const key = request.url

      const cache = await redis.get(key)
      console.log(JSON.stringify(key))

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
      console.log(err)
      reply.send(err)
    }
  })

  fastify.get('/swapi/films', swapiFilmsOpts, async (request, reply) => {
    try {
      const { redis } = fastify
      const key = request.url

      const cache = await redis.get(key)
      console.log(JSON.stringify(key))

      if (!cache) {
        fastify.log.info("Couldn't find a value in cache. Fetching data from api.")
        const response = await fastify.fetch('https://swapi.dev/api/films')
        const json = await response.json()
        redis.set(request.query.key, JSON.stringify(json), 'EX', 60 * 5)
        reply.send(json)
      } else {
        fastify.log.info('Got a value from cache key: ', key)
        reply.send(JSON.parse(cache))
      }
    } catch (err) {
      console.log(err)
    }
  })

  fastify.get('/swapi/films/:id', swapiFilmItem, async (request, reply) => {
    try {
      const { redis } = fastify
      const key = request.url
      const id = request.params.id

      const cache = await redis.get(key)
      console.log(JSON.stringify(key))

      if (!cache) {
        fastify.log.info("Couldn't find a value in cache. Fetching data from api.")
        const response = await fastify.fetch('https://swapi.dev/api/films/' + id)
        const json = await response.json()
        redis.set(request.query.key, JSON.stringify(json), 'EX', 60 * 5)
        reply.send(json)
      } else {
        fastify.log.info('Got a value from cache key: ', key)
        reply.send(JSON.parse(cache))
      }
    } catch (err) {
      console.log(err)
    }
  })

  fastify.get('/swapi/planets', swapiPlanetsOpts, async (request, reply) => {
    const { redis } = fastify
    const key = request.url

    const cache = await redis.get(key)
    console.log(JSON.stringify(key))

    if (!cache) {
      fastify.log.info("Couldn't find a value in cache. Fetching data from api.")
      const response = await fastify.fetch('https://swapi.dev/api/planets')
      const json = await response.json()
      redis.set(request.query.key, JSON.stringify(json), 'EX', 60 * 5)
      reply.send(json)
    } else {
      fastify.log.info('Got a value from cache key: ', key)
      reply.send(JSON.parse(cache))
    }
  })

  fastify.get('/swapi/planets/:id', swapiPlanetItemOpts, async (request, reply) => {
    const { redis } = fastify
    const key = request.url
    const id = request.params.id

    const cache = await redis.get(key)
    console.log(JSON.stringify(key))

    if (!cache) {
      fastify.log.info("Couldn't find a value in cache. Fetching data from api.")
      const response = await fastify.fetch('https://swapi.dev/api/planets/' + id)
      const json = await response.json()
      redis.set(request.query.key, JSON.stringify(json), 'EX', 60 * 5)
      reply.send(json)
    } else {
      fastify.log.info('Got a value from cache key: ', key)
      reply.send(JSON.parse(cache))
    }
  })
}

export default swapi
