const ReactDOM = require('react-dom')
const React = require('react')
const PlayForm = require('../src/PlayForm')
const ReactTestUtils = require('react-dom/test-utils')

describe("RPS App", function () {
    let domFixture

    beforeEach(() => {
        domFixture = document.createElement('div')
        document.querySelector('body').appendChild(domFixture)
    })

    afterEach(() => {
        domFixture.remove()
    })

    it("displays Title", function () {
        renderPlayForm({})

        expect(domFixture.innerText).toContain('RPS')
    })

    describe('displays content for response', () => {
        it('displays Invalid text if request calls invalid', () => {
            const invalidRequestsStub = {
                playGame: (p1, p2, observer) => observer.invalid()
            }
            renderPlayForm(invalidRequestsStub)

            expect(domFixture.innerText).not.toContain('Invalid')
            document.querySelector('button').click()

            expect(domFixture.innerText).toContain('Invalid')
        })

        it('displays Player 1 Wins text if request calls player1Wins', () => {
            const player1WinsRequestsStub = {
                playGame: (p1, p2, observer) => observer.player1Wins()
            }
            renderPlayForm(player1WinsRequestsStub)

            expect(domFixture.innerText).not.toContain('Player 1 Wins')
            document.querySelector('button').click()

            expect(domFixture.innerText).toContain('Player 1 Wins')
        })

        it('displays Player 2 Wins text if request calls player2Wins', () => {
            const player2WinsRequestsStub = {
                playGame: (p1, p2, observer) => observer.player2Wins()
            }
            renderPlayForm(player2WinsRequestsStub)

            expect(domFixture.innerText).not.toContain('Player 2 Wins')
            document.querySelector('button').click()

            expect(domFixture.innerText).toContain('Player 2 Wins')
        })

        it('displays TIE text if request calls tie', () => {
            const tieRequestsStub = {
                playGame: (p1, p2, observer) => observer.tie()
            }
            renderPlayForm(tieRequestsStub)

            expect(domFixture.innerText).not.toContain('Tie')
            document.querySelector('button').click()

            expect(domFixture.innerText).toContain('Tie')
        })
    })

    describe('sends hands to request object', () => {
        it('sends player 1 hand and player 2 hand to request', () => {
            const requestsSpy = jasmine.createSpyObj("requests", ['playGame'])
            renderPlayForm(requestsSpy)

            const p1Input = document.querySelector('[name="p1Throw"]')
            p1Input.value = 'rock'
            ReactTestUtils.Simulate.change(p1Input)

            const p2Input = document.querySelector('[name="p2Throw"]')
            p2Input.value = 'scissors'
            ReactTestUtils.Simulate.change(p2Input)

            document.querySelector('button').click()

            expect(requestsSpy.playGame)
                .toHaveBeenCalledWith('rock', 'scissors', jasmine.any(Object))
        })
    })

    function renderPlayForm(requestsDouble) {
        ReactDOM.render(
            <PlayForm requests={requestsDouble}/>,
            domFixture
        )
    }
})
