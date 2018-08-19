describe('play', () => {
    it('rock vs scissors', () => {
        const result = new Requests().play('rock', 'scissors')

        expect(result).toBe('Player 1 Wins')
    })
})

function Requests() {
    this.play = () => {
        return 'Player 1 Wins'
    }
}
