describe('play', () => {
  it('rock vs scissors', () => {
    const player1WinsSpy = jasmine.createSpy()
    const observer = {
      player1Wins: player1WinsSpy
    }
    new Requests().play('rock', 'scissors', observer)

    expect(player1WinsSpy).toHaveBeenCalled()
  })
})

function Requests() {
  this.play = (p1Hand, p2Hand, observer) => {
    observer.player1Wins()
  }
}
