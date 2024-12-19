import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';

function ManageLogs() {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch logs from the backend
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/logs', {
          withCredentials: true,
        });
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setMessage('Failed to load logs.');
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="flex">
      {/* Main content area */}
      <div className="flex-grow p-4 overflow-auto max-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Logs</h2>
        {message && (
          <p className={`mb-4 ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">idstaff</th>
              <th className="py-3 px-6 text-left">Action</th>
              <th className="py-3 px-6 text-left">Details</th>
              <th className="py-3 px-6 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{log.userId}</td>
                <td className="py-3 px-6 text-left">{log.action}</td>
                <td className="py-3 px-6 text-left">{log.details}</td>
                <td className="py-3 px-6 text-left">{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Menu />
    </div>
  );
}

export default ManageLogs;
