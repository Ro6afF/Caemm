import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <h1> This is a map... With train visualizer... Probably...</h1>
    }
}

ReactDOM.render(
    <Map />,
    document.getElementById('root')
)