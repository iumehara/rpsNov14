const { Round } = require('./../src/rps')


function FakeRoundRepo() {

    this.rounds = []
    this.isEmpty = () => {
        return this.rounds.length <= 0
    }

    this.save = (round) => {
        this.rounds.push(round)
    }

    this.getAll = () => {
        return this.rounds
    }
}

module.exports = {FakeRoundRepo}