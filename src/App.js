import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import Header from './components/Header';
import Dashboard from './components/dashboard/Dashboard';
import Turqi from './components/Turqi';
import Bullgari from './components/Bullgari';
import EuropeCityBreak from './components/EuropeCityBreak';
import AddUser from './components/dashboard/AddUser';
import ManageUser from './components/dashboard/ManageUser';
import ManageHomeTable from './components/dashboard/ManageHomeTable';
import Nav from './components/nav';
import TurqiTable from './components/dashboard/TurqiTable';


const App = () => {
 

  return (
    <Router>
    <Nav />
          <div className='overflow-hidden'>
      

    
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/turqi" element={<Turqi />} />
            <Route path="/bullgari" element={<Bullgari />} />
            <Route path="/europecitybreak" element={<EuropeCityBreak />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/AddUser" element={<AddUser />} />
            <Route path="/ManageUser" element={<ManageUser />} />
            <Route path="/ManageHomeTable" element={<ManageHomeTable />} />
            <Route path="/TurqiTable" element={<TurqiTable />} />
            {/* <Route path="/AddRoomPrices" element={<AddRoomPrices />} /> */}


            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
