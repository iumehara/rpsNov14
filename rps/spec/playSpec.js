describe("play", () => {
    let ui

    beforeEach(() => {
        ui = jasmine.createSpyObj("ui", ["p1Wins", "p2Wins", "tie", "invalid"])
    })

    describe("p1 win scenarios", () => {
        it('rock v. scissors', () => {
            play("rock", "scissors", ui)

            expectP1Wins(ui)
        })

        it('scissors v. paper', () => {
            play("scissors", "paper", ui)

            expectP1Wins(ui)
        })

        it('paper v. rock', () => {
            play("paper", "rock", ui)

            expectP1Wins(ui)
        })
    })

    describe("p2 win scenarios", () => {
        it('scissors v. rock', () => {
            play("scissors", "rock", ui)

            expectP2Wins(ui)
        })

        it('paper v. scissors', () => {
            play("paper", "scissors", ui)

            expectP2Wins(ui)
        })

        it('rock v. paper', () => {
            play("rock", "paper", ui)

            expectP2Wins(ui)
        })
    })

    describe("tie scenarios", () => {
        it("rock v. rock", () => {
            play("rock", "rock", ui)

            expectTie(ui)
        })

        it("scissors v. scissors", () => {
            play("scissors", "scissors", ui)

            expectTie(ui)
        })

        it("paper v. paper", () => {
            play("paper", "paper", ui)

            expectTie(ui)
        })
    })

    describe("invalid scenarios", () => {
        it("invalid v. rock", () => {
            play(Math.random(), "rock", ui)

            expectInvalid(ui)
        })

        it("rock v. invalid", () => {
            play("rock", Math.random(), ui)

            expectInvalid(ui)
        })

        it('invalid v. same invalid', () => {
            play("sailboat", "sailboat", ui)

            expectInvalid(ui)
        });
    })

    function expectP1Wins(ui) {
        expect(ui.p1Wins).toHaveBeenCalled()
        expect(ui.p2Wins).not.toHaveBeenCalled()
        expect(ui.tie).not.toHaveBeenCalled()
        expect(ui.invalid).not.toHaveBeenCalled()
    }

    function expectP2Wins(ui) {
        expect(ui.p1Wins).not.toHaveBeenCalled()
        expect(ui.p2Wins).toHaveBeenCalled()
        expect(ui.tie).not.toHaveBeenCalled()
        expect(ui.invalid).not.toHaveBeenCalled()
    }

    function expectTie(ui) {
        expect(ui.p1Wins).not.toHaveBeenCalled()
        expect(ui.p2Wins).not.toHaveBeenCalled()
        expect(ui.tie).toHaveBeenCalled()
        expect(ui.invalid).not.toHaveBeenCalled()
    }

    function expectInvalid(ui) {
        expect(ui.p1Wins).not.toHaveBeenCalled()
        expect(ui.p2Wins).not.toHaveBeenCalled()
        expect(ui.tie).not.toHaveBeenCalled()
        expect(ui.invalid).toHaveBeenCalled()
    }

    function play(p1, p2, ui) {
        new Requests().play(p1, p2, ui)
    }
})

function Requests() {
    this.play = function (p1, p2, ui) {
        if (isInvalid()) {
            ui.invalid()
        } else if (isTie()) {
            ui.tie()
        } else if (p1Wins()) {
            ui.p1Wins()
        } else {
            ui.p2Wins()
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
}
