import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRouter from './Components/PrivateRouter';
import './App.css';

import Home from './Components/Home';
import Login from './Components/Login';
import Logout from './Components/Logout';

import CompanyIndex from './Components/Companies/index';
import CompanyCreate from './Components/Companies/create';
import CompanyEdit from './Components/Companies/edit';
import CompanyShow from './Components/Companies/show';

import EmployeeIndex from './Components/Employees/index';
import EmployeeCreate from './Components/Employees/create';
import EmployeeEdit from './Components/Employees/edit';
import EmployeeShow from './Components/Employees/show';


function App() {
  return (
    <Router>
      <Switch>
          <Route path='/login' exact component={Login}/>
          <Route path='/logout' exact component={Logout}/>
         
          <PrivateRouter path='/companies' exact component={CompanyIndex}/>
          <PrivateRouter path='/companies/create' exact component={CompanyCreate}/>
          <PrivateRouter path='/companies/:id/edit' exact component={CompanyEdit}/>
          <PrivateRouter path='/companies/:id' exact component={CompanyShow}/>

          <PrivateRouter path='/employees' exact component={EmployeeIndex}/>
          <PrivateRouter path='/employees/create' exact component={EmployeeCreate}/>
          <PrivateRouter path='/employees/:id/edit' exact component={EmployeeEdit}/>
          <PrivateRouter path='/employees/:id' exact component={EmployeeShow}/>

          <Route path='/' exact component={Home} /> 
      </Switch>
    </Router>
    
  );
}


export default App;
