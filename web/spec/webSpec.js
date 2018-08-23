const ReactDOM = require('react-dom')
const React = require('react')
const ReactTestUtils = require('react-dom/test-utils')
const PlayForm = require('../src/PlayForm')

describe('play form', function () {
  let domFixture
  beforeEach(() => {
    domFixture = document.createElement('div')
    document.querySelector('body').appendChild(domFixture)
  })
  afterEach(() => {
    domFixture.remove()
  })

  describe('when request tells web UI that input is invalid', function () {
    it('displays invalid input', function () {
      const requests = {play: (p1, p2, uiObserver) => uiObserver.invalid()}
      ReactDOM.render(
        <PlayForm requests = {requests}/>,
        domFixture
      )

      const expectedText = 'Invalid Input'
      expect(domFixture.innerText).not.toContain(expectedText)
      document.querySelector('button').click()
      expect(domFixture.innerText).toContain(expectedText)
    })
  })

  describe('when request tells web UI that result is tied', function () {
    it('displays TIE', function () {
      const requests = {play: (p1, p2, uiObserver) => uiObserver.tie()}
      ReactDOM.render(
        <PlayForm requests = {requests}/>,
        domFixture
      )

      const expectedText = 'Players Tie'
      expect(domFixture.innerText).not.toContain(expectedText)
      document.querySelector('button').click()
      expect(domFixture.innerText).toContain(expectedText)
    })
  })

  describe('when request tells web UI that player one won', function () {
    it('displays Player 1 Wins!', function () {
      const requests = {play: (p1, p2, uiObserver) => uiObserver.p1Wins()}
      ReactDOM.render(
        <PlayForm requests = {requests}/>,
        domFixture
      )

      const expectedText = 'Player 1 Wins!'
      expect(domFixture.innerText).not.toContain(expectedText)
      document.querySelector('button').click()
      expect(domFixture.innerText).toContain(expectedText)
    })
  })

  describe('when request tells web UI that player two won', function () {
    it('displays Player 2 Wins!', function () {
      const requests = {play: (p1, p2, uiObserver) => uiObserver.p2Wins()}
      ReactDOM.render(
        <PlayForm requests = {requests}/>,
        domFixture
      )

      const expectedText = 'Player 2 Wins!'
      expect(domFixture.innerText).not.toContain(expectedText)
      document.querySelector('button').click()
      expect(domFixture.innerText).toContain(expectedText)
    })
  })

  it('sends the users input to the play request', () => {
    const playSpy = jasmine.createSpy('playSpy')
    const requests = {play: playSpy}
    ReactDOM.render(
      <PlayForm requests = {requests}/>,
      domFixture
    )

    fillInInputWith('p1Throw', 'rock')
    fillInInputWith('p2Throw', 'paper')
    document.querySelector('button').click()

    expect(playSpy).toHaveBeenCalledWith('rock', 'paper', jasmine.any(Object))
  })

  function fillInInputWith(inputName, inputValue) {
    let input = document.querySelector(`[name='${inputName}']`)
    input.value = inputValue
    ReactTestUtils.Simulate.change(input)
  }
})

