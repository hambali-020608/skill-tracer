"use client"
import { useState } from 'react';
import {  FiMenu } from 'react-icons/fi';
import SideBar from './components/SideBar';
import { Dashboard } from './components/Dashboard';

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="md:hidden text-gray-400 hover:text-white"
          >
            <FiMenu size={24} />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <span className="font-bold">U</span>
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-gray-800"></span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <Dashboard/>
      </div>
    </div>
  );
};

export default Page;