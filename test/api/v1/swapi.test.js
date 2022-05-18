import { test } from 'tap'
import build from './../../helper.js'

test('Default root route', async () => {
  test('First call, no cache', async (t) => {
    const app = await build(t)
    // Clear cache
    app.redis.del('/api/v1/swapi')
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

  test('Second call should use cache', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi'
    })
    t.same(res.statusCode, 200)
  })
})

test('Films route', async () => {
  test('First call, no cache', async (t) => {
    const app = await build(t)
    // Clear cache
    app.redis.del('/api/v1/swapi/films')
    const res = await app.inject({
      url: '/api/v1/swapi/films'
    })

    t.same(res.statusCode, 200)
  })

  test('Second call should use cache', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/films'
    })

    t.same(res.statusCode, 200)
  })
})

test('Film route', async () => {
  test('First call, no cache', async (t) => {
    const app = await build(t)
    // Clear cache
    app.redis.del('/api/v1/swapi/films/1')
    const res = await app.inject({
      url: '/api/v1/swapi/films/1'
    })

    t.same(res.statusCode, 200)
  })

  test('Second call should use cache', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/films/1'
    })

    t.same(res.statusCode, 200)
  })
})

test('Planets route', async () => {
  test('First call, no cache', async (t) => {
    const app = await build(t)
    // Clear cache
    app.redis.del('/api/v1/swapi/planets')
    const res = await app.inject({
      url: '/api/v1/swapi/planets'
    })

    t.same(res.statusCode, 200)
  })

  test('Second call should use cache', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/planets'
    })

    t.same(res.statusCode, 200)
  })
})

test('Planet route', async () => {
  test('First call, no cache', async (t) => {
    const app = await build(t)
    // Clear cache
    app.redis.del('/api/v1/swapi/planets/1')
    const res = await app.inject({
      url: '/api/v1/swapi/planets/1'
    })

    t.same(res.statusCode, 200)
  })

  test('Second call should use cache', async (t) => {
    const app = await build(t)

    const res = await app.inject({
      url: '/api/v1/swapi/planets/1'
    })

    t.same(res.statusCode, 200)
  })
})
