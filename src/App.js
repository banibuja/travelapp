import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation  } from 'react-router-dom';
import axios from 'axios';


//Components import
import Home from './components/Home/Home';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import './App.css';
import Turqi from './components/Turqi/Turqi';
import Bullgari from './components/Bullgari/Bullgari';
import Greqi from './components/Greqi/Greqi';
import FestateFundvitit from './components/FestaFundVitit/FestateFundvitit';
import EuropeCityBreak from './components/EuropeCity/EuropeCityBreak';
import Nav from './components/layout/nav';
import Dubai from './components/Dubai/Dubai';
import Aranzhman from './components/Aranzhman';
import VisitKosova from './components/VisitKosova/VisitKosova';



//Dashboard import
import Dashboard from './aDashboard/Dashboard';
import AddUser from './aDashboard/users/AddUser';
import ManageUser from './aDashboard/users/ManageUser';
import ManageHomeTable from './aDashboard/tables/ManageHomeTable';
import TurqiTable from './aDashboard/tables/TurqiTable';
import DubaiTable from './aDashboard/tables/DubaiPricesTable';
import SliderManage from './aDashboard/tables/SliderManage';
import ManageCardsStamboll from './aDashboard/tables/CardsStamboll';

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
            <Route path="/greqi" element={<Greqi />} />
            <Route path="/festateFundvitit" element={<FestateFundvitit />} />
            <Route path="/europecitybreak" element={<EuropeCityBreak />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/AddUser" element={<AddUser />} />
            <Route path="/dashboard/ManageUser" element={<ManageUser />} />
            <Route path="/dashboard/ManageHomeTable" element={<ManageHomeTable />} />
            <Route path="/dashboard/TurqiTable" element={<TurqiTable />} />
            <Route path="/dashboard/DubaiTable" element={<DubaiTable />} />
            <Route path="/dashboard/SliderManage" element={<SliderManage />} />
            <Route path="/dashboard/ManageCardsStamboll" element={<ManageCardsStamboll />} />

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
