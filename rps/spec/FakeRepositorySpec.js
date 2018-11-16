const { FakeRoundRepo } = require('./FakeRoundRepo')
const { Round } = require('../src/rps')

describe('fake round repo', () => {

    it('is empty', () => {
        let repo = new FakeRoundRepo()

        expect(repo.isEmpty()).toBe(true)
    })

    it('is not empty', () => {
        let repo = new FakeRoundRepo()
        let round = new Round('paper', 'rock', 'p1Wins')
        repo.save(round)

        const rounds = repo.getAll()
        const count = rounds.length

        expect(count).toBe(1)
        expect(repo.isEmpty()).toBe(false)
        expect(repo.getAll()).toContain(round)
    })
})