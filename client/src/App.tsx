import React from 'react';
import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const auth = localStorage.getItem("isLoggedIn")
  const isLoggedIn  = auth === "true"
  
  return (
    <div className="App">
      <header className="App-header">
       <h3> Finance Assistant </h3>
       <Router>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />             
          <Route path='/signup' element={isLoggedIn ? <Navigate to="/home" />  : <Signup />} />            
          <Route path='/home' element={isLoggedIn ?  <Home/> : <Navigate to="/" /> } />
        </Routes>
       </Router>
      
      </header>
    </div>
  );
}

export default App;
