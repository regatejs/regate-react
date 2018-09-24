import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import uuidv4 from 'uuid/v4'

window.Regate = window.Regate || {}
window.Regate.Text = window.Regate.Text || {}

window.Regate.Text.init = function ({
  uniqueId,
  name,
  value,
  isRequired,
  placeholder,
  onInitialized,
  onChange,
}) {
  var _container = document.getElementById(uniqueId)
  var _input = _container.querySelector('[data-role=input]')
  
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


window.Regate.Text.markup = (shouldWrite) => {
  const markup = `
    <input
      data-role='input'
      type='text'
      class='form-control'
    />
  `

  if (shouldWrite) {
    document.write(markup)
  }

  return markup
}


class RegateText extends Component {
  constructor(props) {
    super(props)

    this._uniqueId = uuidv4()
  }

  componentDidMount() {
    const {onChange, onInitialized} = this.props

    window.Regate.Text.init({
      uniqueId: this._uniqueId,
      name: 'title',
      value: 'mojtaba',
      onChange: onChange && onChange.bind(this),
      onInitialized: onInitialized && onInitialized.bind(this),
    })
    
  }

  render() {
    return(
      <span
        id={this._uniqueId}
        dangerouslySetInnerHTML={{__html: window.Regate.Text.markup()}}
      ></span>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { text: '' }
  }

  onChange = ({ value }) => {
    console.log(value)
    console.log(this)
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


          <RegateText
            name="Title"
            value="mojtaba2"
          />

          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default App;
