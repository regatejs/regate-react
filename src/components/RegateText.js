import React, { Component } from 'react'
import _RegateText from '../regate/RegateText'
import uuidv4 from 'uuid/v4'

class RegateText extends Component {
  constructor(props) {
    super(props)

    this._uniqueId = 'RegateText__' + this.props.name + '__' + uuidv4()

    this._value = this.props.value
  }

  componentDidMount() {
    const { onChange, onInitialized } = this.props

    const _uniqueId = this._uniqueId

    _RegateText.init({
      id: this._uniqueId,
      name: this.props.name,
      value: this.props.value,
      onChange: (function (component) {
        return function () {
          const value = component._value
          _RegateText.update(_uniqueId, value)

          if (typeof onChange === typeof Function)
            onChange(...arguments)
        }
      }(this)),
      onInitialized,
    })
  }

  componentDidUpdate() {
    this._value = this.props.value
    _RegateText.update(this._uniqueId, this.props.value)
  }

  render() {
    return (
      <div id={this._uniqueId}>
        <div dangerouslySetInnerHTML={{ __html: _RegateText.markup(this._uniqueId) }}></div>
      </div>
    )
  }
}

export default RegateText
