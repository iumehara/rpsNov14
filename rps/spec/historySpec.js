const {Requests, Round} = require('../src/rps')
const {FakeRoundRepo} = require('./FakeRoundRepo')

describe('history', () => {
    it('return rounds that have been played', () => {
        let requests = new Requests()
        let fakeRepo = new FakeRoundRepo()
        let uiStub = {
            invalid: () => {}
        }
        let historyObserver = jasmine.createSpyObj('observer', ['rounds'])

        requests.play('rock', 'sailboat', uiStub, fakeRepo)
        requests.getHistory(historyObserver, fakeRepo)

        let round = new Round('rock', 'sailboat', 'invalid')
        expect(fakeRepo.getAll()).toContain(round)
        expect(fakeRepo.getAll().length).toBe(1)

        expect(historyObserver.rounds).toHaveBeenCalledWith([
            round
        ])
    })

    it('return rounds that have been played', () => {
        let requests = new Requests()
        let fakeRepo = new FakeRoundRepo()
        let uiStub = {
            invalid: () => {}
        }

        requests.play('sailboat', 'rock', uiStub, fakeRepo)

        expect(fakeRepo.getAll()).toContain(new Round('sailboat', 'rock', 'invalid'))
        expect(fakeRepo.getAll().length).toBe(1)
    })
})