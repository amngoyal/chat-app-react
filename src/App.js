import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Chat, Join } from './components'

class App extends Component {
    render() {
        return (
            <Router>
                <Route path='/' exact component={Join}></Route>
                <Route path='/chat' component={Chat}></Route>
            </Router>
        );
    }
}

export default App;