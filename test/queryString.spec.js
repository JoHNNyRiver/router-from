var QS = require('../router/queryString')

describe('TESTING QUERY STRING FUNCTION', function () {
	it('should return a array', function () {
		var splitAttr = QS.splits('&')
		var arr = splitAttr('?front=javaScript&back=Node')

		expect(arr).toEqual(["?front=javaScript", "back=Node"])
	})

	it('should return a array of array exemple: `[ [] ]`', function () {
		var splitAttr = QS.splits('&')
		var arr = splitAttr('?front=javaScript&back=Node')

		arr = arr.map(function (item) {
			var splitfy = QS.splits('=')
			return splitfy(item)
		})

		expect(arr).toEqual([['?front', 'javaScript'], ['back', 'Node']])
	})


	it('should return a string without `?`', function () {
		var without = QS.unwanted('?')
		var withoutTwo = without('?front=javaScript')

		expect(withoutTwo).toBe('front=javaScript')
	})

	it('should return a object', function () {
		var parsed = QS.parse('?front=javaScript')

		expect(parsed).toEqual({'front': 'javaScript'})
	})

	it('should return a empty object', function () {
		var parsed = QS.parse('?')

		expect(parsed).toEqual({})
	})

	it('should return a `javascript` value', function () {
		var parsed = QS.parse('?front=javaScript')
		var value = parsed.front

		expect(value).toBe('javaScript')
	})
})
