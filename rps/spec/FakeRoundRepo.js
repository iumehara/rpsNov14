function FakeRoundRepo() {
    let rounds = []

    this.isEmpty = () => {
        return rounds.length === 0
    }

    this.save = (round) => {
        rounds.push(round)
    }

    this.getAll = () => {
        return rounds
    }
}

module.exports = FakeRoundRepo