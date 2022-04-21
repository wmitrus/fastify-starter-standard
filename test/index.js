import { test } from 'tap'
import { createServer } from 'http'

test('basic', function (t) {
  const server = createServer().listen(8001)
  server.close()
  t.end()
})
