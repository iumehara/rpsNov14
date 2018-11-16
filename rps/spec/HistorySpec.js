const Round = require('../src/Round')
const Requests = require('../src/Rps')

describe("history", () => {
    describe("no rounds played", () => {
        it('tells the ui that no round have been played', () => {
            const emptyRoundsRepoStub = {
                isEmpty: () => {
                    return true
                }
            }
            let uiSpy = jasmine.createSpyObj('uiSpy', ['noRounds'])

            new Requests().getHistory(uiSpy, emptyRoundsRepoStub)

            expect(uiSpy.noRounds).toHaveBeenCalled()
        })
    })

    describe("rounds has been played", () => {
        it('round results are returned', () => {
            const hasRoundsRepoStub = {
                isEmpty: () => {
                    return false
                },
                getAll: () => {
                    return [new Round('rock', 'sailboat', 'invalid')]
                }
            }
            let uiSpy = jasmine.createSpyObj('uiSpy', ['rounds'])

            new Requests().getHistory(uiSpy, hasRoundsRepoStub)

            expect(uiSpy.rounds).toHaveBeenCalledWith([
                new Round('rock', 'sailboat', 'invalid')
            ])
        })
    })
})