import React from 'react';
import Map from './Map';
import { Menu, MenuHeader } from 'semantic-ui-react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: 'home'
        }
    }
    render() {
        return (
            <span>
                <div className="navbar">
                    <Menu position="right" size="huge">
                        <Menu.Item><b><h3>CAEMM</h3></b></Menu.Item>
                        <Menu.Item>Map</Menu.Item>
                        <Menu.Item disabled>Trips</Menu.Item>
                        <Menu.Item disabled>About</Menu.Item>
                    </Menu>
                </div>
                <Map />
            </span>
        );
    }
}

export default App;