import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import uuidv4 from 'uuid/v4'

const _RegateText = {}

_RegateText.init = function ({
  id,
  name,
  value,
  isRequired,
  placeholder,
  onInitialized,
  onChange,
}) {

  if (id === undefined)
    throw new Error("id is required")

  var _container = document.getElementById(id)
  _container.insertAdjacentHTML('afterend', _RegateText.markup(id))
  _container.parentNode.removeChild(_container)

  var _input = document.getElementById(id + '__input')

  _input.name = name

  if (isRequired === true)
    _input.required = true

  if (value !== undefined)
    _input.value = value

  if (placeholder !== undefined)
    _input.placeholder = placeholder

  if (typeof onInitialized === typeof Function) {
    const isValid = isRequired
      ? value !== undefined && value.length > 0
      : true

      onInitialized({value, isValid})
  }

  if (typeof onChange === typeof Function) {
    _input.oninput = () => {
      const value = _input.value

      const isValid = isRequired
        ? value !== undefined && value.length > 0
        : true

      onChange({value, isValid})
    }
  }
}


_RegateText.markup = (id) => `
  <input
    id='${id}__input'
    type='text'
    class='form-control'
  />
`



class RegateText extends Component {
  constructor(props) {
    super(props)

    this._uniqueId = 'RegateText__' + this.props.name + '__' + uuidv4()
  }

  componentDidMount() {
    const {onChange, onInitialized} = this.props

    _RegateText.init({
      id: this._uniqueId,
      name: this.props.name,
      value: this.props.value,
      onChange: onChange && onChange.bind(this),
      onInitialized: onInitialized && onInitialized.bind(this),
    })
  }

  render() {
    return(
      <template id={this._uniqueId}></template>
    )
  }
}

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
      <div className="App" style={{backgroundColor: this.state.color}}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <form method='get'>
          <RegateText
            name="Title"
            value="mojtaba"
            onChange={this.onChange}
            onInitialized={this.onChange}
          />

          <div><b>{ this.state.text }</b></div>

          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default App;
