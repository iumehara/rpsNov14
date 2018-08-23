const React = require('react')

class PlayForm extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  playButtonWasClicked() {
    this.setState({result: 'invalid input'})
  }

  render() {
    return (
      <div>
        <div>{this.state.result}</div>
        <button onClick={this.playButtonWasClicked.bind(this)}>
          play
        </button>
      </div>
    )
  }
}

module.exports = PlayForm