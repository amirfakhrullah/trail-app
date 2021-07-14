import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// import SideBar from './components/sidebar/sideBar';
import Login from './components/login/login';
import SignUp from './components/signup/signUp';
import Dashboard from './components/dashboard/dashboard';
import SideBar from './features/sidebar/sideBar';
import TicketsPage from './components/ticketsPage/ticketsPage';
import AssignedPage from './components/assignedPage/assignedPage';
import OrganizationsPage from './components/organizationsPage/organizationsPage';
import OneTicketPage from './components/onTicketPage/oneTicketPage';

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <SideBar />
          </Route>
        </Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/user/tickets">
          <TicketsPage />
        </Route>
        <Route exact path="/user/assigned">
          <AssignedPage />
        </Route>
        <Route exact path="/organizations">
          <OrganizationsPage />
        </Route>
        <Route exact path="/tickets/:id" component={OneTicketPage} />
      </Router>
    </div>
  )
}

