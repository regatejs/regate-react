import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RegateText from './components/RegateText'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { text: 'default state' }
  }

  onChange = ({ value }) => {
    this.setState({ text: value })
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: this.state.color }}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          &nbsp;
        </p>

        <form method='get'>
          <RegateText
            name="Title"
            value="Hello World"
          />

          <RegateText
            name="Title"
            value={this.state.text}
          />

          <RegateText
            name="Title"
            value={this.state.text}
            onChange={this.onChange}
          />

          <div style={{textAlign: 'left'}}>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>

        </form>
      </div>
    );
  }
}

export default App;
