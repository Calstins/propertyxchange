import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import { RiMenuFoldLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../redux/toggle/toggleSlice';

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const isSidebarFolded = useSelector((state) => state.sidebar.isSidebarFolded);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="flex relative">
      <div className="bg-white">
        <Sidebar isFolded={isSidebarFolded} />
      </div>
      <div className="p-3 w-[100%] overflow-y-auto">
        <div
          className="absolute text-2xl text-white bg-slate-600 p-2 cursor-pointer"
          onClick={handleToggleSidebar}
        >
          {isSidebarFolded ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
        </div>
        <div className="flex-grow p-8 h-screen overflow-y-auto hide-scrollbar">
          <h1 className="font-bold text-center text-2xl">
            Welcome back {currentUser.username}!
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
