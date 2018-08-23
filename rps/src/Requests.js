function Requests() {
  this.play = (p1Hand, p2Hand, observer) => new PlayRequest(p1Hand, p2Hand, observer).process()
}

function PlayRequest(p1Hand, p2Hand, observer) {
  this.process = () => {
    if (invalidHand()) {
      observer.invalid()
    } else if (isTie()) {
      observer.tie()
    } else if (player2Wins()) {
      observer.p2Wins()
    } else {
      observer.p1Wins()
    }
  }

  function invalidHand() {
    return !['paper', 'rock', 'scissors'].includes(p1Hand) ||
      !['paper', 'rock', 'scissors'].includes(p2Hand)
  }

  function isTie() {
    return p1Hand === p2Hand
  }

  function player2Wins() {
    return p1Hand === 'rock' && p2Hand === 'paper' ||
      p1Hand === 'paper' && p2Hand === 'scissors' ||
      p1Hand === 'scissors' && p2Hand === 'rock'
  }
}

module.exports = Requests