const FakeRoundRepo = require('./FakeRoundRepo')
const Round = require('../src/Round')

describe("fake round repo", () => {
    let repo

    beforeEach(() => {
        repo = new FakeRoundRepo()
    })

    describe('when no rounds have been played', () => {
        it('is empty', () => {
            expect(repo.isEmpty()).toBe(true)
        })
    })

    describe('when rounds have been played', () => {
        it('is not empty', () => {
            repo.save(new Round('rock', 'paper', 'p2Wins'))

            expect(repo.isEmpty()).toBe(false)
        })

        it('can get history', () => {
            let round = new Round('rock', 'paper', 'p2Wins')

            repo.save(round)

            expect(repo.getAll()).toEqual([round])
        })
    })
})
