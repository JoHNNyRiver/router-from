const Route = require('../router/router')

const ul = document.querySelector('ul.exec')

// Middlewares
Route.middleware(response => ul.insertAdjacentHTML('beforeend', `<li>middleware will execute for all route</li>`))
Route.middleware('/', response => ul.insertAdjacentHTML('beforeend', '<li>middleware before root route</li>'))
Route.middleware('/about.html', response => ul.insertAdjacentHTML('beforeend', '<li>middleware before about.html route</li>'))
Route.middleware('/contact.html', response => ul.insertAdjacentHTML('beforeend', '<li>middleware before contact.html route</li>'))

// Routes
Route.from('/', response => ul.insertAdjacentHTML('beforeend', '<li>Router root</li>'))
Route.from('/about.html', response => ul.insertAdjacentHTML('beforeend', '<li>Router about</li>'))

Route.from('/contact.html', response => {
  const { language, paradigm } = response.query

  ul.insertAdjacentHTML('beforeend', '<li>Router contact with params</li>')
  ul.insertAdjacentHTML('beforeend', `<li>property "Language": ${language} </li>`)
  ul.insertAdjacentHTML('beforeend', `<li>property "Paradigm": ${paradigm} </li>`)
})
