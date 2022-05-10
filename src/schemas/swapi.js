import fp from 'fastify-plugin'

const swapiSchemas = async (fastify, options) => {
  const swapi = {
    swapiResponseSchema: {
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

  swapi.swapiFilmItem = {
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

  swapi.swapiFilmsResponseSchema = {
    200: {
      type: 'object',
      properties: {
        count: { type: 'number' },
        next: { type: 'null' },
        previous: { type: 'null' },
        results: {
          type: 'array',
          items: swapi.swapiFilmItem
        }
      }
    }
  }

  swapi.swapiFilmIdResponseSchema = {
    200: swapi.swapiFilmItem
  }

  swapi.swapiPlanetItem = {
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

  swapi.swapiPlanetsResponseSchema = {
    200: {
      type: 'object',
      properties: {
        count: { type: 'string' },
        next: { type: 'string' },
        previous: { type: 'null' },
        results: {
          type: 'array',
          items: swapi.swapiPlanetItem
        }
      }
    }
  }

  swapi.swapiPlanetResponseSchema = {
    200: swapi.swapiPlanetItem
  }

  fastify.decorate('swapiSchemas', swapi)
}

export default fp(swapiSchemas)
