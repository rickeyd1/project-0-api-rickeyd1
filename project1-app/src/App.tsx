import React from 'react';
import './App.css';
import './include/bootstrap';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { NavComponent } from './components/nav/nav.component';
import {SignInComponent} from './components/sign-in/signin.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/users/user.component';
import ReimbursementComponent from './components/reimbursements/reimbursement.component';
import UserEditComponent from './components/users/user-edit.component';
import SubmitReimComponent from './components/reimbursements/submitReim.component';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavComponent />
        <Switch>
          <Route path="/sign-in" component={SignInComponent} />
          <Route path="/home" component={HomeComponent} />
          <Route path="/users" component={UserComponent} />
          <Route path="/reimbursements" component={ReimbursementComponent} />
          <Route path="/useredit" component={UserEditComponent} />
          <Route path="/submit" component={SubmitReimComponent} />
          <Route exact path="/" component={SignInComponent} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;