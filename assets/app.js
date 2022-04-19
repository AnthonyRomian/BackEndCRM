import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
// start the Stimulus application
import 'bootswatch/dist/materia/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './js/components/Navbar';
import PrivateRoute from './js/components/PrivateRoute';
import AuthContext from './js/contexts/AuthContext';
import CustomersPage from './js/pages/CustomersPage';
import CustomerPage from './js/pages/CustomerPage';
import RegisterPage from './js/pages/RegisterPage';

import HomePage from './js/pages/HomePage';
import InvoicesPage from './js/pages/InvoicesPage';
import InvoicePage from './js/pages/InvoicePage';
import LoginPage from './js/pages/LoginPage';
import AuthAPI from './js/services/AuthAPI';

import { ToastContainer, toast } from 'react-toastify';

AuthAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );

    const NavBarWithRouter = withRouter(Navbar);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <NavBarWithRouter/>
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/invoices/:id" component={InvoicePage} />
                        <PrivateRoute path="/invoices" component={InvoicesPage} />
                        <PrivateRoute path="/customers/:id" component={CustomerPage} />
                        <PrivateRoute path="/customers" component={CustomersPage} />

                        {/* <Route path="/customers" render={props => 
                        isAuthenticated ? ( 
                        <CustomersPage {...props}/>
                        ) : (
                        <Redirect to="/login" />
                        )
                    }/> */}
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        </AuthContext.Provider>
        
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement)