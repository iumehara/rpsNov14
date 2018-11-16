const React = require('react')

class PlayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: '',
            p1Throw: '',
            p2Throw: ''
        }
    }

    submitClicked(e) {
        this.props.requests.playGame(
            this.state.p1Throw,
            this.state.p2Throw,
            this
        )
    }

    player1Wins() {
        this.setState({result: 'Player 1 Wins'})
    }

    player2Wins() {
        this.setState({result: 'Player 2 Wins'})
    }

    tie() {
        this.setState({result: 'Tie'})
    }

    invalid() {
        this.setState({result: 'Invalid'})
    }

    inputChanged(e) {
        console.log(e)
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div>
                <div>RPS</div>
                <input name='p1Throw' onChange={this.inputChanged.bind(this)}/>
                <input name='p2Throw' onChange={this.inputChanged.bind(this)}/>
                <button onClick={this.submitClicked.bind(this)}>
                    Submit
                </button>
                <div>{this.state.result}</div>
            </div>
        )
    }
}

module.exports = PlayForm