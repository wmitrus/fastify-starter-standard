'use strict'

import Fastify from 'fastify'
import App from './../app.js'

// Automatically build and tear down our instance
async function build (t) {
  // eslint-disable-next-line new-cap
  const app = Fastify()

  // Fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  app.register(App)

  await app.ready()

  // Tear down our app after we are done
  t.teardown(async () => app.close())

  return app
}

export default build
