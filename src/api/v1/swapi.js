
const swapi = async (fastify, options) => {
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
    },
    handler: fastify.swapi.getSwapi
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
    },
    handler: fastify.swapi.getFilms
  }

  const swapiFilmIdOpts = {
    schema: {
      response: {
        200: FilmItem
      }
    },
    handler: fastify.swapi.getFilm
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
    },
    handler: fastify.swapi.getPlanets
  }

  const swapiPlanetIdOpts = {
    schema: {
      response: {
        200: swapiPlanetItem
      }
    },
    handler: fastify.swapi.getPlanet
  }

  fastify.get('/swapi', swapiOpts)
  fastify.get('/swapi/films', swapiFilmsOpts)
  fastify.get('/swapi/films/:id', swapiFilmIdOpts)
  fastify.get('/swapi/planets', swapiPlanetsOpts)
  fastify.get('/swapi/planets/:id', swapiPlanetIdOpts)
}

export default swapi
