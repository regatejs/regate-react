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
        };

        this.inputRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.onInitialize) {
            const normalizedValue = this._normalizedValue(this.props.value);

            this.props.onInitialize({
                value: normalizedValue,
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
        return value.toString().split('').filter(char => {
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

        // const oSel = e.nativeEvent.target.selectionStart;
        // console.log(oSel);
        // this.inputRef.current.selectionStart = 2;
        // this.inputRef.current.selectionEnd = 3;

        this.props.onChange({
            value: normalizedValue,
            isValid: this._isValid(normalizedValue)
        })
    }

    render() {
        return <div>
            <input
                ref={this.inputRef}
                type="text"
                // inputMode="numeric"
                pattern="[0-9]*"
                value={this.state.beautifiedValue}
                // value={this.props.value}
                onChange={this.onChange}
                {...this.props.inputProps}
            />
        </div>
    }
}
