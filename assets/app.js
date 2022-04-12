import React from 'react';

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import ReactDOM from 'react-dom';
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import { HashRouter, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import CustomersPage from './js/pages/CustomersPage';
import CustomersPageWithPagination from './js/components/CustomersPageWithNavigation';
import InvoicesPage from './js/pages/InvoicesPage';


console.log("Hello world !")

const App = () => {
    return (
        <HashRouter>
            <Navbar/>
            
            <main className="container pt-5">
                <Switch>
                    <Route path="/invoices" component={InvoicesPage}/>
                    <Route path="/customers" component={CustomersPage}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </main>
        </HashRouter>
    );   
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>,rootElement)