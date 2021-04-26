import React from 'react';
import {BrowserRouter,Switch, Route} from 'react-router-dom';
import Login from '../components/Login';
import App from '../App'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/empresas' component={App} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;