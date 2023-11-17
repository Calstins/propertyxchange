import React from 'react';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';

const Dashboard = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex">
      <div className="bg-white">
        <Sidebar />
      </div>
      <div className="flex-grow p-8">
        <h1 className="font-bold text-lg">
          Welcome back {currentUser.username}!
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
