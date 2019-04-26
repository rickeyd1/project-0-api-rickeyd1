import React from 'react';
import './App.css';
import './include/bootstrap';
import { BrowserRouter, Route} from 'react-router-dom';
import { NavComponent } from './components/nav/nav.component';
import {SignInComponent} from './components/sign-in/signin.component';
import { HomeComponent } from './components/home/home.component';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavComponent />
      <Route path="/sign-in" component={SignInComponent} />
      <Route path="/home" component={HomeComponent} />
    </BrowserRouter>
  );
}

export default App;
