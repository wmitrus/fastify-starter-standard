import tap from 'tap'
import Bork from '../../src/examples/example2.js'

const myBork = new Bork()

tap.test('Bound functions are bound to the class instance.', t => {
  t.equal(myBork.boundFunction.call(undefined), 'bork', 'Default value of instanceProperty')
  myBork.instanceProperty = 'newBork'
  t.equal(myBork.boundFunction.call(undefined), 'newBork', 'Value of instanceProperty was changed')

  t.end()
})

tap.test('Static function exists on the class', t => {
  t.equal(Bork.staticFunction(), 'babelIsCool')
  Bork.staticProperty = 'Standard v17 Is Cool'
  t.equal(Bork.staticFunction(), 'Standard v17 Is Cool')

  t.end()
})
