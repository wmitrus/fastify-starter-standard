class Bork {
  // Property initializer syntax
  instanceProperty = 'bork'
  boundFunction = () => {
    return this.instanceProperty
  }

  // Static class properties
  static staticProperty = 'babelIsCool'
  static staticFunction = function () {
    return Bork.staticProperty
  }
}

export default Bork
