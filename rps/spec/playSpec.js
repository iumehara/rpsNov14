describe("play", () => {
    let ui

    beforeEach(() => {
        ui = jasmine.createSpyObj("ui", ["p1Wins", "p2Wins", "tie"])
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

    describe("tie scnenarios", () => {
        it("rock v. rock", () => {
            play("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", () => {
            play("scissors", "scissors", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper v. paper", () => {
            play("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    function expectP1Wins(ui) {
        expect(ui.p1Wins).toHaveBeenCalled()
        expect(ui.p2Wins).not.toHaveBeenCalled()
        expect(ui.tie).not.toHaveBeenCalled()
    }

    function expectP2Wins(ui) {
        expect(ui.p1Wins).not.toHaveBeenCalled()
        expect(ui.p2Wins).toHaveBeenCalled()
        expect(ui.tie).not.toHaveBeenCalled()
    }

    function expectTie(ui) {
        expect(ui.p1Wins).not.toHaveBeenCalled()
        expect(ui.p2Wins).not.toHaveBeenCalled()
        expect(ui.tie).toHaveBeenCalled()
    }
})

function play(p1, p2, ui) {
    if (p1 === p2) {
        ui.tie()
    } else if (
        p1 === "rock" && p2 === "scissors" ||
        p1 === "scissors" && p2 === "paper" ||
        p1 === "paper" && p2 === "rock"
    ) {
        ui.p1Wins()
    } else {
        ui.p2Wins()
    }
}