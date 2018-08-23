const React = require('react')
const ReactDOM = require('react-dom')
const PlayForm = require('./PlayForm')
const {Requests} = require('rps/src/rps')

class App extends React.Component {
  render(){
    return <PlayForm requests={new Requests()}/>
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#app')
)