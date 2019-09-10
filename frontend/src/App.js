import React from 'react';
import Map from './Map';
import About from './About';
import { Menu, Header } from 'semantic-ui-react';
import NotFoundPage from './NotFoundPage';
import { Router, Route, Switch } from'react-router-dom';
import { createBrowserHistory } from 'history';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.history = createBrowserHistory();
    }

    click(loc) {
        this.history.push(loc);
    }

    render() {
        return (
            <Router history={this.history}>
                <div className="navbar">
                    <Menu position="right" size="huge">
                        <Menu.Item><Header as="h3">CAEMM</Header></Menu.Item>
                        <Menu.Item onClick={() => this.click('/')}>Home</Menu.Item>
                        <Menu.Item disabled>Trips</Menu.Item>
                        <Menu.Item onClick={() => this.click('/about')}>About</Menu.Item>
                    </Menu>
                </div>
                <Switch>
                    <Route exact path="/" component={Map} />
                    <Route path="/about" component={About} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        );
    }
}

export default App;