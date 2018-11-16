function Requests() {
    this.play = function (p1, p2, ui) {
        new RequestObject(p1, p2, ui).process()
    }
}

function RequestObject(p1, p2, ui) {
    this.process = () => {
        if (isInvalid()) {
            ui.invalid()
        } else if (isTie()) {
            ui.tie()
        } else if (player1Wins()) {
            ui.p1Wins()
        } else {
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

module.exports = Requests
