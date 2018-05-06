var param = require('../router/param')

describe('TESTING THE PARAM FUNCTION GENERATE', function () {
  it('should return a empty object', function () {
    var params = param('about', '/about')

    expect(params).toEqual({})
  })

  it('should return `John` value', function () {
    var params = param('about/:user', '/about/John')

    expect(params.user).toBe('John')
  })

  it('should return a property user', function () {
    var params = param('about/:user', '/about/João')

    expect(params).toHaveProperty('user')
  })
})
