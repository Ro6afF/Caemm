import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

class NotFoundPage extends React.Component {
    render() {
        document.title = '404 - Caemm';
        return (
            <Segment>
                <Header as="h1">
                    Oops, the page you are searching for does not exist!
                </Header>
            </Segment>
        );
    }
}

export default NotFoundPage;