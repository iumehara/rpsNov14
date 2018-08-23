const ReactDOM = require('react-dom')
const React = require('react')
const PlayForm = require('../src/PlayForm')

describe('play form', function () {
  describe('when request tells web UI that input is invalid', function () {
    it('displays invalid input', function () {
      const domFixture = document.createElement('div')
      document.querySelector('body').appendChild(domFixture)
      const requests = {
        play: (p1, p2, uiObserver) => uiObserver.invalid()
      }


      ReactDOM.render(
        <PlayForm requests = {requests}/>,
        domFixture
      )

      const expectedText = 'invalid input'
      expect(domFixture.innerText).not.toContain(expectedText)

      document.querySelector('button').click()

      expect(domFixture.innerText).toContain(expectedText)
    })
  })
})
