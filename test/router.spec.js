var Router = require('../router/router')

describe('TESTING ROUTER MAIN FUNCTION THE PROJECT', function () {
  it('should be have a property `from`', function () {
  	var route = Router()

  	expect(route).toHaveProperty('from')
  })

  it('should be return a empty array`', function () {
  	var route = Router()

  	expect(route.subscribe).toEqual([])
  })
})
