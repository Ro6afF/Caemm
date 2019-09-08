import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

class NotFoundPage extends React.Component {
    render() {
        return (
            <Segment>
                <Header as='h1'>
                    Mamma mia, Mario is not able to find the spaghetti specified!
                </Header>
            </Segment>
        );
    }
}

export default NotFoundPage;