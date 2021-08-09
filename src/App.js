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
import Footer from './components/footer/footer';
import OneOrganizationPage from './components/oneOrganizationPage/oneOrganizationPage';
import CreateTicketPage from './components/createTicketPage/createTicketPage';
import UpdateTicket from './components/updateTicket/updateTicket';
import DeleteTicket from './components/deleteTicket/deleteTicket';
import CreateOrganization from './components/createOrganization/createOrganization';
import UpdateOrganizationPassword from './components/updateOrganization/updateOrganizationPassword';
import InviteUser from './components/inviteUser/inviteUser';
import OrganizationVerification from './components/organizationVerification/organizationVerification';

export default function App() {
  return (
    <div>
      <div style={{ minHeight: '85vh' }}>
        <Router>
          <Switch>
            <Route exact path="/organizations/:id/auth/:key" component={OrganizationVerification} />
            <Route exact path="/login/organizations/:id/auth/:key" component={Login} />
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
          <Route exact path="/my-tickets">
            <TicketsPage />
          </Route>
          <Route exact path="/assigned">
            <AssignedPage />
          </Route>
          <Route exact path="/organizations">
            <OrganizationsPage />
          </Route>
          <Route exact path="/create-organization" component={CreateOrganization} />
          <Route exact path="/tickets/:id" component={OneTicketPage} />
          <Route exact path="/tickets/:id/update" component={UpdateTicket} />
          <Route exact path="/tickets/:id/delete" component={DeleteTicket} />
          <Route exact path="/organizations/:id" component={OneOrganizationPage} />
          <Route exact path="/organizations/:id/invite" component={InviteUser} />
          <Route exact path="/organizations/:id/create-ticket" component={CreateTicketPage} />
          <Route exact path="/organizations/:id/update-password" component={UpdateOrganizationPassword} />
        </Router>
      </div>
      <Footer />
    </div>
  )
}

