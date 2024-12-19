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
import VisitKosova from './components/VisitKosova/VisitKosova';

import Search from './components/Search/Search';

import ProtectedRoute from './aDashboard/ProtectedRoute';

//Dashboard import
import Dashboard from './aDashboard/Dashboard';
import AddUser from './aDashboard/users/AddUser';
import ManageUser from './aDashboard/users/ManageUser';
import ManageHomeTable from './aDashboard/tables/ManageHomeTable';
import TurqiTable from './aDashboard/tables/TurqiTable';
import DubaiTable from './aDashboard/tables/DubaiPricesTable';
import SliderManage from './aDashboard/tables/SliderManage';
import ManageCardsStamboll from './aDashboard/tables/CardsStamboll';
import HurghadaCards from './aDashboard/tables/HurghadaCards';
import KapodakiaCards from './aDashboard/tables/KapodakiaCards';

import AddAranzhmanet from './aDashboard/aranzhmanet/AddAranzhmanet';
import ManageAranzhmanet from './aDashboard/aranzhmanet/ManageAranzhmanet';

import AddAirport from './aDashboard/airports/AddAirport';
import ManageAirports from './aDashboard/airports/ManageAirports';

import AddShtetin from './aDashboard/shtetet/AddShtetin';
import ManageShtetet from './aDashboard/shtetet/ManageShtetet';

import AddQytetet from './aDashboard/qytetet/AddQytetet';
import ManageQytetet from './aDashboard/qytetet/ManageQytetet';


import ManageLogs from './aDashboard/Logs/Logs';
import SliderBullgari from './aDashboard/tables/SliderBullgari';
const App = () => {
 
  const location = useLocation();
  const isHomeroute = !location.pathname.startsWith('/dashboard') 
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
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
            <Route path="/dashboard/AddUser" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
            <Route path="/dashboard/ManageUser" element={<ProtectedRoute><ManageUser /></ProtectedRoute>} />
            <Route path="/dashboard/ManageHomeTable" element={<ProtectedRoute><ManageHomeTable /></ProtectedRoute>} />
            <Route path="/dashboard/TurqiTable" element={<ProtectedRoute><TurqiTable /></ProtectedRoute>} />
            <Route path="/dashboard/DubaiTable" element={<ProtectedRoute><DubaiTable /></ProtectedRoute>} />
            <Route path="/dashboard/SliderManage" element={<ProtectedRoute><SliderManage /></ProtectedRoute>} />
            <Route path="/dashboard/ManageCardsStamboll" element={<ProtectedRoute><ManageCardsStamboll /></ProtectedRoute>} />
            <Route path="/dashboard/HurghadaCards" element={<ProtectedRoute><HurghadaCards /></ProtectedRoute>} />
            <Route path="/dashboard/KapodakiaCards" element={
            <ProtectedRoute>
              <KapodakiaCards />
            </ProtectedRoute>
          } />

            <Route path="/dashboard/Logs" element={<ProtectedRoute><ManageLogs /></ProtectedRoute>} />
            <Route path="/dashboard/SliderBullgari" element={<ProtectedRoute><SliderBullgari /></ProtectedRoute>} />


            <Route path="/dashboard/AddAranzhmanet" element={<ProtectedRoute><AddAranzhmanet /></ProtectedRoute>} />
            <Route path="/dashboard/ManageAranzhmanet" element={<ProtectedRoute><ManageAranzhmanet /></ProtectedRoute>} />

            <Route path="/dashboard/AddAirport" element={<ProtectedRoute><AddAirport /></ProtectedRoute>} />
            <Route path="/dashboard/ManageAirports" element={<ProtectedRoute><ManageAirports /></ProtectedRoute>} />

            <Route path="/dashboard/AddShtetin" element={<ProtectedRoute><AddShtetin /></ProtectedRoute>} />
            <Route path="/dashboard/ManageShtetet" element={<ProtectedRoute><ManageShtetet /></ProtectedRoute>} />

            <Route path="/dashboard/AddQytetet" element={<AddQytetet />} />
            <Route path="/dashboard/ManageQytetet" element={<ManageQytetet />} />

            <Route path="/Search" element={<Search />} />

            <Route path="/Dubai" element={<Dubai />} />
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
