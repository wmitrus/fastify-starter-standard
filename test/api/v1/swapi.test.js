import { test } from 'tap'
import build from './../../helper.js'

test('Testing swapi', async () => {
  test('Default root route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi'
    })
    t.same(res.statusCode, 200)
    // t.same(JSON.parse(res.payload), {
    //   films: 'https://swapi.dev/api/films/',
    //   people: 'https://swapi.dev/api/people/',
    //   planets: 'https://swapi.dev/api/planets/',
    //   species: 'https://swapi.dev/api/species/',
    //   starships: 'https://swapi.dev/api/starships/',
    //   vehicles: 'https://swapi.dev/api/vehicles/'
    // })
  })

  test('Reading from cache: Default root route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi'
    })
    t.same(res.statusCode, 200)
  })

  test('Films route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/films'
    })

    t.same(res.statusCode, 200)
  })

  test('Reading from cache: Films route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/films'
    })

    t.same(res.statusCode, 200)
  })

  test('Film route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/films/1'
    })

    t.same(res.statusCode, 200)
  })

  test('Reading from cache: Film route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/films/1'
    })

    t.same(res.statusCode, 200)
  })

  test('Planets route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/planets'
    })

    t.same(res.statusCode, 200)
  })

  test('Reading from cache: Planets route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/planets'
    })

    t.same(res.statusCode, 200)
  })

  test('Planet route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/planets/1'
    })

    t.same(res.statusCode, 200)
  })

  test('Reading from cache: Planet route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/planets/1'
    })

    t.same(res.statusCode, 200)
  })
})
