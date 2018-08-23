const React = require('react')

class PlayForm extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  playButtonClicked() {
    this.props.requests.play(this.state.p1Throw, this.state.p2Throw, this)
  }

  invalid(){
    this.setState({result: 'Invalid Input'})
  }

  p1Wins(){
    this.setState({result: 'Player 1 Wins!'})
  }

  p2Wins(){
    this.setState({result: 'Player 2 Wins!'})
  }

  tie(){
    this.setState({result: 'Players Tie'})
  }

  inputChanged(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div>
        <div>{this.state.result}</div>
        <input name="p1Throw" onChange={this.inputChanged.bind(this)}/>
        <input name="p2Throw" onChange={this.inputChanged.bind(this)}/>
        <button onClick={this.playButtonClicked.bind(this)}>
          play
        </button>
      </div>
    )
  }
}

module.exports = PlayForm