const Round = require('../src/Round')

function Requests() {
    this.play = function (p1, p2, ui, repo) {
        new RequestPlayObject(p1, p2, ui, repo).process()
    }

    this.getHistory = function (ui, repo) {
        new RequestGetHistoryObject(ui, repo).process()
    }
}

function RequestPlayObject(p1, p2, ui, repo) {
    this.process = () => {
        if (isInvalid()) {
            repo.save(new Round(p1, p2, 'invalid'))
            ui.invalid()
        } else if (isTie()) {
            repo.save(new Round(p1, p2, 'tie'))
            ui.tie()
        } else if (p1Wins()) {
            repo.save(new Round(p1, p2, 'p1Wins'))
            ui.p1Wins()
        } else {
            repo.save(new Round(p1, p2, 'p2Wins'))
            ui.p2Wins()
        }
    }

    function p1Wins() {
        return p1 === "rock" && p2 === "scissors" ||
            p1 === "scissors" && p2 === "paper" ||
            p1 === "paper" && p2 === "rock"
    }

    function isTie() {
        return p1 === p2
    }

    function isInvalid() {
        return !["rock", "paper", "scissors"].includes(p1) ||
            !["rock", "paper", "scissors"].includes(p2)
    }
}

function RequestGetHistoryObject(ui, repo) {
    function isNoRounds() {
        return repo.isEmpty()
    }

    this.process = () => {
        if (isNoRounds()) {
            ui.noRounds()
            return
        }
        ui.rounds(repo.getAll())
    }
}

module.exports = Requests