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

    it('should return true', function () {
      var event = new Event()
      event.store['some'] = null

      expect(event.isExistsProperty('some')).toBeTruthy()
    })

    it('should return false', function () {
      var event = new Event()

      expect(event.isExistsProperty('some')).toBeFalsy()
    })

    it('should return true using the subscribe method', function () {
      var event = new Event()
      event.subscribe('/', () => 'somethink')

      expect(event.store['/']).toBeTruthy()
    })

    it('should be return a instance', function () {
      var event = new Event()
      event.store['/'] = null

      expect(event.publish('/', {message: 'somethink'})).toBe(event)
    })

    it('should be return empty array', function () {
      var event = new Event()
      var cb = () => console.log('test')
      event.store['/'] = [cb]

      expect(event.unsubscribe('/', cb)).toEqual([])
    })

    it('should be return empty array using subscribe method', function () {
      var event = new Event()
      event.subscribe('/', () => console.log('test'))
      event.unsubscribe('/')

      expect(event.store).toEqual({'/': []})
    })

    it('should be return true `emit` method', function () {
      var event = new Event()
      event.subscribe('/', () => 'test')

      expect(event.emit('/')).toBeTruthy()
    })

    it('should be return false `emit` method', function () {
      var event = new Event()
      expect(event.emit('/')).toBeFalsy()
    })

    it('should be return `Works!!!` using method publish, subscribe and emit', function () {
      var event = new Event()

      event.subscribe('/', event => event.message)
      event.publish('/', {message: 'Works!!!'})
      event.emit('/')

      expect(event.message['/'].message).toBe('Works!!!')
    })
  })
})
