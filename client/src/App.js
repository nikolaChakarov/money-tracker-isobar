import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { GlobalProvider } from './context/GlobalState';

import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Register from './components/Register/Register';

const App = () => {
    return (
        <GlobalProvider>
            <Navigation />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
            </Switch>
        </GlobalProvider>
    )
}

export default App;