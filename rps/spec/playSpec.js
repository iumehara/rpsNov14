const {Requests, Round} = require('../src/rps')

describe("play", () => {
    let ui
    let repoSpy
    let uiStub

    beforeEach(() => {
        ui = jasmine.createSpyObj("ui", ["p1Wins", "p2Wins", "tie", "invalid"])
        repoSpy = jasmine.createSpyObj('repository', ['save'])
        uiStub = {
            p1Wins: () => {},
            p2Wins: () => {}
        }
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

        it('saves game result after a game has been played paper v. rock', () => {
            // repoSpy

            // uiStub

            play('paper', 'rock', uiStub, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledWith(
                new Round('paper', 'rock', 'p1Wins')
            )
            expect(repoSpy.save.calls.count()).toBe(1)

        })

        it('saves game result after a game has been played scissors v. paper', () => {
            // repoSpy

            // uiStub

            play('scissors', 'paper', uiStub, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledWith(
                new Round('scissors', 'paper', 'p1Wins')
            )
            expect(repoSpy.save.calls.count()).toBe(1)
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

        it('saves game result after a game has been played  paper v scissors', () => {
            // repoSpy

            // uiStub

            play('paper', 'scissors', uiStub, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledWith(
                new Round('paper', 'scissors', 'p2Wins')
            )
            expect(repoSpy.save).toHaveBeenCalledTimes(1)
        })

        it('saves game result after a game has been played scissors v rock', () => {
            // repoSpy

            // uiStub

            play('scissors', 'rock', uiStub, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledWith(
                new Round('scissors', 'rock', 'p2Wins')
            )
            expect(repoSpy.save).toHaveBeenCalledTimes(1)
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

    function play(p1, p2, ui, repo) {
        if (repo === undefined) {
            repo = {
                save: () => {
                }
            }
        }
        new Requests().play(p1, p2, ui, repo)
    }
})

describe('history', () => {
    describe('no rounds played', () => {
        it('tells the ui that no rounds have been played', () => {
            const repoStub = {
                isEmpty: () => {
                    return true
                },
            }
            const uiSpy = jasmine.createSpyObj('ui', ['noRounds'])

            new Requests().getHistory(uiSpy, repoStub)

            expect(uiSpy.noRounds).toHaveBeenCalled()
        })
    })

    describe('rounds have been played', () => {
        it('round results are returned', () => {
            const rounds = [new Round('rock', `${Date.now()}`, 'invalid')]
            const repoStub = {
                isEmpty: () => {
                    return false
                },
                getAll: () => {
                    return rounds
                }
            }

            const uiSpy = jasmine.createSpyObj('ui', ['rounds'])


            new Requests().getHistory(uiSpy, repoStub)
            expect(uiSpy.rounds).toHaveBeenCalledWith(rounds)
            expect(uiSpy.rounds).toHaveBeenCalledTimes(1)
        })
    })
})