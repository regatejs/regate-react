import React, {Component} from 'react'


export class RegateCurrency extends Component {
    inputProps;

    static get defaultProps() {
        return {
            separator: '',
        }
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            beautifiedValue: this._beautifiedValue(this.props.value)
        }
    }

    componentDidMount() {
        if (this.props.onInitialize) {
            this.props.onInitialize({
                value: this.props.value,
                isValid: this._isValid()
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate');
        this.setState({beautifiedValue: this._beautifiedValue(this.props.value)})
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('props', this.props, nextProps);
        // console.log('state', this.state, nextState);
        return !(nextProps.value === this.props.value && nextState.beautifiedValue === this.state.beautifiedValue);
    }

    _isValid(currValue) {
        return this.props.min <= currValue && this.props.max >= currValue;
    }

    _normalizedValue(value) {
        return value.split('').filter(char => {
            return !isNaN(parseInt(char, 10));
        }).join('')
    }

    _beautifiedValue(value) {
        return this._separator(value.toString(), this.props.separator)
    }

    _separator(x, sep = '') {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    }

    onChange(e) {
        const value = e.target.value;
        const normalizedValue = this._normalizedValue(value);

        console.log('value', value);
        console.log('normalizedValue', normalizedValue);
        console.log(e, e.nativeEvent);

        this.props.onChange({
            value: normalizedValue,
            isValid: this._isValid(normalizedValue)
        })
    }

    render() {
        return <div>
            <input
                type="text"
                value={this.state.beautifiedValue}
                onChange={this.onChange}
                {...this.props.inputProps}
            />
        </div>
    }
}
