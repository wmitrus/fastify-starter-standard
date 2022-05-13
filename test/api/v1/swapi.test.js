import { test } from 'tap'
import build from './../../helper.js'

test('default root route', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/api/v1/swapi'
  })
  t.same(JSON.parse(res.payload), {
    films: 'https://swapi.dev/api/films/',
    people: 'https://swapi.dev/api/people/',
    planets: 'https://swapi.dev/api/planets/',
    species: 'https://swapi.dev/api/species/',
    starships: 'https://swapi.dev/api/starships/',
    vehicles: 'https://swapi.dev/api/vehicles/'
  })
})
