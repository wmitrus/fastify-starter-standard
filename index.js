// const http = require('http')
// const config = require('node-config-ajv')
import { createServer } from 'http'
import config from 'node-config-ajv'

const hostname = '127.0.0.1'
const port = 3000

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  const dbConfig = config.get('Customer.dbConfig.host')
  res.end('' + dbConfig)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
