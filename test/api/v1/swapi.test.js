import { test } from 'tap'
import build from './../../helper.js'

// test('Testing swapi', async () => {
//   test('Default root route', async (t) => {
//     const app = await build(t)
//     console.log('APP AJV: ' + app.ajv)
//     const res = await app.inject({
//       url: '/api/v1/swapi'
//     })
//     t.same(JSON.parse(res.payload), {
//       films: 'https://swapi.dev/api/films/',
//       people: 'https://swapi.dev/api/people/',
//       planets: 'https://swapi.dev/api/planets/',
//       species: 'https://swapi.dev/api/species/',
//       starships: 'https://swapi.dev/api/starships/',
//       vehicles: 'https://swapi.dev/api/vehicles/'
//     })
//   })
// })
