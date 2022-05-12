'use strict'

import autoload from 'fastify/autoload'
import helmet from 'fastify/helmet'
import fetch from 'node-fetch'
import fp from 'fastify-plugin'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = async (fastify, options) => {
  fastify.register(helmet, {
    global: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['\'self\''],
        styleSrc: ['\'self\'', '\'unsafe-inline\''],
        imgSrc: ['\'self\'', 'data:', 'validator.swagger.io'],
        scriptSrc: ['\'self\'', 'https: \'unsafe-inline\'']
      }
    }
  })

  fastify.register(import('fastify/swagger'), {
    exposeRoute: true,
    routePrefix: '/docs'
  })

  fastify.decorate('fetch', fetch)

  await fastify.register(autoload, {
    dir: join(__dirname, './src/plugins'),
    ignorePattern: /.*test.js/
  })

  fastify.register(import('fastify/redis'), fastify.config.get('redis'))

  fastify.register(autoload, {
    dir: join(__dirname, './src/controllers'),
    ignorePattern: /.*test.js/
  })

  fastify.register(autoload, {
    dir: join(__dirname, './src/schemas'),
    ignorePattern: /.*test.js/
  })

  fastify.register(autoload, {
    dir: join(__dirname, './src/routes'),
    ignorePattern: /.*test.js/
  })

  fastify.register(autoload, {
    dir: join(__dirname, './src/api'),
    ignorePattern: /.*test.js/,
    dirNameRoutePrefix: function rewrite (folderParent, folderName) {
      if (folderParent.includes('api') && folderName === 'v1') {
        return 'api/v1'
      }
      if (folderParent.includes('api') && folderName === 'v2') {
        return 'api/v2'
      }
      return folderName
    }
  })
}

export default fp(app)
