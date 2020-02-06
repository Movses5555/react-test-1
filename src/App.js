import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './Components/Home';
import Login from './Components/Login';
import CompanyIndex from './Components/Companies/index';
import CompanyCreate from './Components/Companies/create';
import EmpIndex from './Components/Employees/EmpIndex';
// import { directive } from '@babel/types';

function App() {
  return (
    <Router>
      <Switch>
          <Route path='/login' exact component={Login}/>
          <Route path='/companies' exact component={CompanyIndex}/>
          <Route path='/companies/create' exact component={CompanyCreate}/>
          <Route path='/employees' exact component={EmpIndex}/>
          <Route path='/' exact component={Home} /> 
      </Switch>
    </Router>
    
  );
}


export default App;
