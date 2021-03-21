import logo from './logo.svg';
import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Booking from './components/Booking/Booking';
import Home from './components/Home/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const userContext = createContext();

function App() {  
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h1 style={{marginTop: '60px', marginLeft:'50px', fontWeight:'bolder', fontFamily:'sans-serif', fontStyle:'italic' }}>Quick Ride</h1>

      <Router>
        <div>
          <nav class='navbar'>            
              <span>
                <Link to="/">Home</Link>
              </span>
              <span>
                <Link to="/login">Login</Link>
              </span>
                    
          </nav>
          <h4>User: {loggedInUser.name}</h4>
          <span>User Email: {loggedInUser.email}</span>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/booking/:bookingId">
              <Booking />
            </PrivateRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </userContext.Provider>
  );
}

export default App;
