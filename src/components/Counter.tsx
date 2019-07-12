import * as React from 'react';

export interface CounterState {
    count: number;
}

export class Counter extends React.Component<{}, CounterState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            count: 0
        };
    }

    count = () => {
        this.setState({
            count: this.state.count + 1
        });
    };

    render() {
        return (
            <div>
                <h1>Counter: {this.state.count}</h1>
                <button onClick={this.count}>Count</button>
            </div>
        );
    }
}
