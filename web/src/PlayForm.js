const React = require('react')

class PlayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: '',
            p1Throw: '',
            p2Throw: '',
            history: [],
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    submitClicked() {
        this.props.requests.playGame(
            this.state.p1Throw,
            this.state.p2Throw,
            this,
            this.props.repository
        )
    }

    p1Wins() {
        this.setState({result: 'Player 1 Wins!!!'})
        this.setState({history: this.props.repository.getAll()})
    }

    player2Wins() {
        this.setState({result: 'Player 2 Wins!!!'})
    }

    tie() {
        this.setState({result: 'tie'})
    }

    invalid() {
        this.setState({result: 'Invalid'})
    }

    inputChanged(e) {
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
                <div>{this.state.history.map((h) => {
                    return <div>{h.p1}, {h.p2}, {h.result}</div>
                })}</div>
            </div>
        )
    }

}

export default PlayForm