import * as ReactDOM from "react-dom"
import * as React from "react"
import PlayForm from "../src/PlayForm"
const ReactTestUtils = require('react-dom/test-utils')
const FakeRoundRepo = require('../../rps/spec/FakeRoundRepo')
const Round = require('../../rps/src/Round')
const Requests = require('../../rps/src/Rps')

describe("RPS App", function () {

    let domFixture

    beforeEach(function() {
        domFixture = document.createElement('div')
        document.querySelector('body').append(domFixture)
    })

    afterEach(function() {
        // domFixture.remove()
    })

    it("displays Title", function () {

        ReactDOM.render(
            <PlayForm/>,
            domFixture
        )

        expect(domFixture.innerText).toContain('RPS')
        expect(domFixture.innerText).not.toContain('Invalid')
        expect(domFixture.innerText).not.toContain('Player 1 Wins!!!')

    })

    it("displays invalid text if request calls invalid", () => {
        // arrange
        const invalidRequestsStub = {
            playGame: (p1, p2, observer, repo) => observer.invalid()
        }
        ReactDOM.render(
            <PlayForm requests={invalidRequestsStub}/>,
            domFixture
        )

        // action
        document.querySelector('button').click()

        // assert
        expect(domFixture.innerText).toContain('Invalid')
    })

    it("displays Player 1 Wins text if request calls player1Wins", () => {
        // arrange
        const player1WinsRequestsStub = {
            playGame: (p1, p2, observer, repo) => observer.p1Wins()
        }
        ReactDOM.render(
            <PlayForm requests={player1WinsRequestsStub}/>,
            domFixture
        )

        // action
        document.querySelector('button').click()

        // assert
        expect(domFixture.innerText).toContain('Player 1 Wins!!!')
    })

    it("displays Player 2 Wins text if request calls player2Wins", () => {
        // arrange
        const player2WinsRequestsStub = {
            playGame: (p1, p2, observer, repo) => observer.player2Wins()
        }
        ReactDOM.render(
            <PlayForm requests={player2WinsRequestsStub}/>,
            domFixture
        )

        // action
        document.querySelector('button').click()

        // assert
        expect(domFixture.innerText).toContain('Player 2 Wins!!!')
    })

    it("displays tie text if request calls tie", () => {
        // arrange
        const tieRequestsStub = {
            playGame: (p1, p2, observer, repo) => observer.tie()
        }
        ReactDOM.render(
            <PlayForm requests={tieRequestsStub}/>,
            domFixture
        )

        // action
        document.querySelector('button').click()

        // assert
        expect(domFixture.innerText).toContain('tie')
    })

    describe('sends hands to request object', () => {
        it('sends player 1 hand and player 2 hand to request', () => {
            // arrange
            const requestsSpy = jasmine.createSpyObj('request', ['playGame'])

            ReactDOM.render(
                <PlayForm requests={requestsSpy}/>,
                domFixture
            )

            const p1Input = document.querySelector('[name="p1Throw"]')
            p1Input.value = 'rock'
            ReactTestUtils.Simulate.change(p1Input)

            const p2Input = document.querySelector('[name="p2Throw"]')
            p2Input.value = 'scissors'
            ReactTestUtils.Simulate.change(p2Input)

            document.querySelector('button').click()

            expect(requestsSpy.playGame)
                .toHaveBeenCalledWith('rock', 'scissors', jasmine.any(Object))        })
    })

    fdescribe('show history', () => {
        it('can show history after a game has been played', () => {
            const repoFake = new FakeRoundRepo()
            const requests = {
                playGame: (p1, p2, observer, repo) => new Requests().play(p1, p2, observer, repo)
            }

            ReactDOM.render(
                <PlayForm repository={repoFake} requests={requests}/>,
                domFixture
            )

            const p1Input = document.querySelector('[name="p1Throw"]')
            p1Input.value = 'rock'
            ReactTestUtils.Simulate.change(p1Input)

            const p2Input = document.querySelector('[name="p2Throw"]')
            p2Input.value = 'scissors'
            ReactTestUtils.Simulate.change(p2Input)

            document.querySelector('button').click()

            expect(domFixture.innerText).toContain('rock, scissors, p1')
        })
    })
})
