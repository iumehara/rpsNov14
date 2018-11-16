const Round = require('../src/Round')
const Requests = require('../src/Rps')

describe("play", () => {
    let ui
    let repoSpy

    beforeEach(() => {
        ui = jasmine.createSpyObj("ui", ["p1Wins", "p2Wins", "tie", "invalid"])
        repoSpy = jasmine.createSpyObj("repoSpy", ["save"])
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

        it('saves game result after a game has been played', () => {
            let p1 = 'paper'
            let p2 = 'rock'

            play(p1, p2, ui, repoSpy)

            expectSave(p1, p2, 'p1Wins')
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

        it('saves game result after a game has been played', () => {
            let p1 = 'rock'
            let p2 = 'paper'

            play(p1, p2, ui, repoSpy)

            expectSave(p1, p2, 'p2Wins')
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

        it('saves game result after a game has been played', () => {
            let p1 = 'rock'
            let p2 = 'rock'

            play(p1, p2, ui, repoSpy)

            expectSave(p1, p2, 'tie')
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
        })

        it('saves game result after a game has been played', () => {
            let p1 = 'rock'
            let p2 = Math.random()

            play(p1, p2, ui, repoSpy)

            expectSave(p1, p2, 'invalid')
        })
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

    function expectSave(p1, p2, result) {
        expect(repoSpy.save).toHaveBeenCalledWith(
            new Round(p1, p2, result)
        )
    }

    function play(p1, p2, ui, repo) {
        if (repo === undefined) {
            repo = {
                save: (round) => {
                }
            }
        }
        new Requests().play(p1, p2, ui, repo)
    }
})





