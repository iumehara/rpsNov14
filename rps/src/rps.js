function Requests() {
    this.play = function (p1, p2, ui, repository) {
        new RequestObject(p1, p2, ui, repository).process()
    }

    this.getHistory = (ui, repository) => {

        if (repository.isEmpty()) {
            ui.noRounds()
        } else {
            ui.rounds(repository.getAll())
        }
    }
}

function Round(p1, p2, result) {
    this.p1 = p1
    this.p2 = p2
    this.result = result
}

function RequestObject(p1, p2, ui, repository) {
    this.process = () => {
        if (isInvalid()) {
            repository.save(new Round(p1, p2, 'invalid'))
            ui.invalid()
        } else if (isTie()) {
            ui.tie()
        } else if (player1Wins()) {
            repository.save(new Round(p1, p2, 'p1Wins'))
            // repository.save(new Round('paper', 'rock', 'p1Wins'));
            // repository.save(new Round('scissors', 'paper', 'p1Wins'));
            ui.p1Wins()
        } else {
            repository.save(new Round(p1, p2, 'p2Wins'))
            ui.p2Wins()
        }
    }

    function isInvalid() {
        return !["rock", "paper", "scissors"].includes(p1) ||
            !["rock", "paper", "scissors"].includes(p2)
    }

    function isTie() {
        return p1 === p2
    }

    function player1Wins() {
        return p1 === "rock" && p2 === "scissors" ||
            p1 === "scissors" && p2 === "paper" ||
            p1 === "paper" && p2 === "rock"
    }
}

module.exports = {Round, Requests}