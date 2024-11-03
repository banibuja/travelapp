import React from 'react';
import { Link } from 'react-router-dom';
import { AddItem, EditItem, ItemList } from '../ItemsCrud/ItemCrud';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-500 p-4 text-white">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <nav className="mt-4 space-x-4">
      
        </nav>
      </div>
      <div className="p-4">
        {/* <ItemList /> */}
      </div>
    </div>
  );
}

export default Dashboard;
