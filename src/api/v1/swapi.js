
const swapi = async (fastify, options) => {
  const swapiOpts = {
    schema: {
      response: fastify.swapiSchemas.swapiResponseSchema
    },
    handler: fastify.swapi.getSwapi
  }

  const swapiFilmsOpts = {
    schema: {
      response: fastify.swapiSchemas.swapiFilmsResponseSchema
    },
    handler: fastify.swapi.getFilms
  }

  const swapiFilmIdOpts = {
    schema: {
      response: fastify.swapiSchemas.swapiFilmIdResponseSchema
    },
    handler: fastify.swapi.getFilm
  }

  const swapiPlanetsOpts = {
    schema: {
      response: fastify.swapiSchemas.swapiPlanetsResponseSchema
    },
    handler: fastify.swapi.getPlanets
  }

  const swapiPlanetIdOpts = {
    schema: {
      response: fastify.swapiSchemas.swapiPlanetResponseSchema
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
