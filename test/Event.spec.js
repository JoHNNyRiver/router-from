var Event = require('../events/Events')

describe('TESTING THE PROJECT', function () {
  describe('Test the class Event pub/sub', function () {
    it('should exists instance', function () {
      var event = new Event()

      expect(event).toEqual(event)
    })

    it('should thorw a error', function () {
      expect(Event).toThrow()
    })

    it('should be a instance of Event', function () {
      var event = new Event()

      expect(event).toBeInstanceOf(Event)
    })

    it('should be a object type the property message', function () {
      var event = new Event()

      expect(event.message).toEqual({})
    })

    it('should be a object type the property store', function () {
      var event = new Event()

      expect(event.store).toEqual({})
    })
  })
})
