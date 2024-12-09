import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation  } from 'react-router-dom';
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
import AddUser from './components/dashboard/users/AddUser';
import ManageUser from './components/dashboard/users/ManageUser';
import ManageHomeTable from './components/dashboard/tables/ManageHomeTable';
import Nav from './components/nav';
import TurqiTable from './components/dashboard/tables/TurqiTable';
import DubaiTable from './components/dashboard/tables/DubaiPricesTable';
import Dubai from './components/Dubai';
import Aranzhman from './components/Aranzhman';
import VisitKosova from './components/VisitKosova';


const App = () => {
 
  const location = useLocation();
  const isHomeroute = !location.pathname.startsWith('/dashboard');

  return (
    <>
      {isHomeroute && <Nav />}
      

    
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/turqi" element={<Turqi />} />
            <Route path="/bullgari" element={<Bullgari />} />
            <Route path="/europecitybreak" element={<EuropeCityBreak />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/AddUser" element={<AddUser />} />
            <Route path="/dashboard/ManageUser" element={<ManageUser />} />
            <Route path="/dashboard/ManageHomeTable" element={<ManageHomeTable />} />
            <Route path="/dashboard/TurqiTable" element={<TurqiTable />} />
            <Route path="/dashboard/DubaiTable" element={<DubaiTable />} />
            <Route path="/Dubai" element={<Dubai />} />
            <Route path="/Aranzhman" element={<Aranzhman />} />
            <Route path="/VisitKosova" element={<VisitKosova />} />

            {/* <Route path="/AddRoomPrices" element={<AddRoomPrices />} /> */}


            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
      </div></>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);
export default AppWrapper;
