const Requests = require('../src/rps')

describe('play', () => {
  describe('player 1 wins', () => {
    it('rock vs scissors', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('rock', 'scissors', observerSpy)

      expect(observerSpy.p1Wins).toHaveBeenCalled()
    })

    it('paper vs rock', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('paper', 'rock', observerSpy)

      expect(observerSpy.p1Wins).toHaveBeenCalled()
    })

    it('scissors vs paper', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('scissors', 'paper', observerSpy)

      expect(observerSpy.p1Wins).toHaveBeenCalled()
    })
  })

  describe('player 2 wins', () => {
    it('rock vs paper', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('rock', 'paper', observerSpy)

      expect(observerSpy.p2Wins).toHaveBeenCalled()
    })

    it('paper vs scissors', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('paper', 'scissors', observerSpy)

      expect(observerSpy.p2Wins).toHaveBeenCalled()
    })

    it('scissors vs rock', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('scissors', 'rock', observerSpy)

      expect(observerSpy.p2Wins).toHaveBeenCalled()
    })
  })

  describe('tie', () => {
    it('rock vs rock', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('rock', 'rock', observerSpy)

      expect(observerSpy.tie).toHaveBeenCalled()
    })
    it('paper vs paper', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('paper', 'paper', observerSpy)

      expect(observerSpy.tie).toHaveBeenCalled()
    })
    it('scissors vs scissors', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('scissors', 'scissors', observerSpy)

      expect(observerSpy.tie).toHaveBeenCalled()
    })
  })

  describe('invalid', () => {
    it('sailboat vs rock', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('sailboat', 'rock', observerSpy)

      expect(observerSpy.invalid).toHaveBeenCalled()
    })

    it('rock vs sailboat', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('rock', 'sailboat', observerSpy)

      expect(observerSpy.invalid).toHaveBeenCalled()
    })

    it('sailboat vs sailboat', () => {
      const observerSpy = jasmine.createSpyObj('player1Wins', ['p1Wins', 'p2Wins', 'tie', 'invalid'])
      new Requests().play('sailboat', 'sailboat', observerSpy)

      expect(observerSpy.invalid).toHaveBeenCalled()
    })
  })
})
