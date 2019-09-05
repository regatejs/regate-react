import React, {Component} from 'react'


export class RegateCurrency extends Component {
    inputProps;

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if (this.props.onInitialize) {
            this.props.onInitialize({
                value: this.props.value,
                isValid: this._isValid()
            })
        }
    }

    _isValid(currValue) {
        return this.props.min <= currValue && this.props.max >= currValue;
    }

    _normalizedValue(value) {
        return value.split('').filter(char => {
            return !isNaN(char);
        }).join('')
    }

    onChange(e) {
        const value = e.target.value;
        const normalizedValue = this._normalizedValue(value);

        this.props.onChange({
            value: normalizedValue,
            isValid: this._isValid(normalizedValue)
        })
    }

    render() {
        return <div>
            <input type="text"/>
            <input
                type="text"
                value={this.props.value}
                onChange={this.onChange}
                {...this.props.inputProps}
            />
        </div>
    }
}
