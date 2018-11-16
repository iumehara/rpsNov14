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

        it('saves one game result after a game has been played', () => {
            const repoSpy = jasmine.createSpyObj('repoSpy', ['save'])
            const uiStub = { p1Wins: () => {} }

            play('paper', 'rock', uiStub, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledTimes(1)
            expect(repoSpy.save).toHaveBeenCalledWith(
                new Round('paper', 'rock', 'p1Wins')
            )
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

        it('saves one game result after a game has been played', () => {
            const repoSpy = jasmine.createSpyObj('repoSpy', ['save'])
            const uiStub = { p2Wins: () => {} }

            play('rock', 'paper', uiStub, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledTimes(1)
            expect(repoSpy.save).toHaveBeenCalledWith(
                new Round('rock', 'paper', 'p2Wins')
            )
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

        it('saves one game result after a game has been played', () => {
            const repoSpy = jasmine.createSpyObj('repoSpy', ['save'])
            const uiStub = { tie: () => {} }

            play('rock', 'rock', uiStub, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledTimes(1)
            expect(repoSpy.save).toHaveBeenCalledWith(
                new Round('rock', 'rock', 'tie')
            )
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

        it('saves one game result after a game has been played', () => {
            const repoSpy = jasmine.createSpyObj('repoSpy', ['save'])
            const uiStub = { invalid: () => {} }

            play('rock', 'sailboat', uiStub, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledTimes(1)
            expect(repoSpy.save).toHaveBeenCalledWith(
                new Round('rock', 'sailboat', 'invalid')
            )
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
                save: () => {}
            }
        }

        new Requests().play(p1, p2, ui, repo)
    }
})

describe('history', () => {
    describe('no rounds played', () => {
        it('tells the ui that no rounds have been played', () => {
            const emptyRepoStub = {
                isEmpty: () => { return true }
            }
            const uiSpy = jasmine.createSpyObj('uiSpy', ['noRounds'])

            new Requests().getHistory(uiSpy, emptyRepoStub)

            expect(uiSpy.noRounds).toHaveBeenCalled()
        })
    })

    describe('rounds have been played', () => {
        it('round results are returned', () => {
            const hasRoundsRepoStub = {
                isEmpty: () => { return false },
                getAll: () => {
                    return [new Round('rock', 'sailboat', 'invalid')]
                }
            }
            const uiSpy = jasmine.createSpyObj('uiSpy', ['rounds'])

            new Requests().getHistory(uiSpy, hasRoundsRepoStub)

            expect(uiSpy.rounds).toHaveBeenCalledWith(
                [new Round('rock', 'sailboat', 'invalid')]
            )
        })
    })
})

function Round(p1, p2, result) {
    this.p1 = p1
    this.p2 = p2
    this.result = result
}

function Requests() {
    this.play = function (p1, p2, ui, repo) {
       new RequestObject(p1, p2, ui, repo).process()
    }

    this.getHistory = function (ui, repo) {
        if (repo.isEmpty()) {
            ui.noRounds()
        } else {
            ui.rounds(repo.getAll())
        }
    }
}

function RequestObject(p1, p2, ui, repo) {
    this.process = () => {
        if (isInvalid()) {
            repo.save(new Round(p1, p2, 'invalid'))
            ui.invalid()
        } else if (isTie()) {
            repo.save(new Round(p1, p2, 'tie'))
            ui.tie()
        } else if (player1Wins()) {
            repo.save(new Round(p1, p2, 'p1Wins'))
            ui.p1Wins()
        } else {
            repo.save(new Round(p1, p2, 'p2Wins'))
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
