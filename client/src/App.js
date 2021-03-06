import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { GlobalProvider } from './context/GlobalState';

import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Footer from './components/Footer/Footer';

import Transactions from './components/Transactions/Transactions';

import './App.css';

const App = () => {
    return (
        <GlobalProvider>
            <Navigation />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />

                <Route path="/transactions" component={Transactions} />
            </Switch>
            <Footer />
        </GlobalProvider>
    )
}

export default App;