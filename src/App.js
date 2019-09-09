import React, {Component} from 'react';
import './App.css'
import {RegateCurrency} from "./@regate/currency";


class MyComponent extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.state = {
            inputClass: 'untouched',
            style: { },
            value: 1000
        }
    }

    onChange({value, isValid}) {
        // console.log(value);
        // console.log(isValid);
        this.setState({
            inputClass: isValid ? 'success' : 'error',
            style: isValid ? { border: '1px solid green' } : { border: '1px solid red' },
            value
        })
    }

    render() {
        return <div>
            <RegateCurrency
                min={5000}
                max={9000}
                separator=','
                value={this.state.value}
                onInitialize={this.onChange}
                onChange={this.onChange}
                currency='kr'
                inputProps={{
                    className: this.state.inputClass
                    // style: this.state.style
                }}
            />

            The real value is: {this.state.value}
        </div>;
    }
}

function App() {
    return (
        <div>
            <div>Regate</div>
            <MyComponent/>
        </div>
    );
}

export default App;
