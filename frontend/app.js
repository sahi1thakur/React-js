import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route path="/login" component={LoginPage} />
                <Route path="/home" component={HomePage} />
            </Switch>
        </Router>
    );
}

export default App;
