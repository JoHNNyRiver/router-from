var Router = require('../router/router')

describe('TESTING ROUTER MAIN FUNCTION THE PROJECT', function () {
  it('should be have a property `from`', function () {
    expect(Router).toHaveProperty('from')
  })

  it('should be return a empty array', function () {
    expect(Router.subscribe).toEqual([])
  })

  it('should be have a property `middleware`', function () {
    expect(Router).toHaveProperty('middleware')
  })
})
