
import Link from 'next/link';
import { useState } from 'react';
import { FiHome, FiTrendingUp, FiTarget, FiBarChart2, FiSettings, FiLogOut, FiMenu, FiX, FiAward, FiCalendar, FiClock } from 'react-icons/fi';
import {LuBot} from "react-icons/lu"
export default function SideBar({sidebarOpen,setSidebarOpen}:any){
    //  const [sidebarOpen, setSidebarOpen] = useState(true);
     const [activeTab, setActiveTab] = useState('dashboard');

    return(
        
    <div 
            className={`fixed md:relative z-30 w-64 bg-gray-800 border-r border-gray-700 h-full transition-all duration-300 ease-in-out ${
              sidebarOpen ? 'left-0' : '-left-64'
            }`}
          >
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
              <h1 className="text-2xl font-bold">
                Skill<span className="text-green-400">Track</span>
              </h1>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="md:hidden text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>
    
            <nav className="p-5">
              {[
                { icon: <FiHome />, name: 'Dashboard', id: 'dashboard',  to:'/dashboards'},
                { icon: <FiTrendingUp />, name: 'Progress', id: 'progress' ,to:'/progress'},
                { icon: <FiTarget />, name: 'Goals', id: 'goals',to:'skills' },
                { icon: <LuBot />, name: 'ChatBot', id: 'chatbot',to:'/chatbots' },

                // { icon: <FiBarChart2 />, name: 'Analytics', id: 'analytics' },
                // { icon: <FiAward />, name: 'Achievements', id: 'achievements' },
                // { icon: <FiSettings />, name: 'Settings', id: 'settings' },
              ].map((item) => (
                <Link href={item.to}
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-green-500/10 text-green-400'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
    
            <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
              <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors">
                <span className="mr-3"><FiLogOut /></span>
                Logout
              </button>
            </div>
          </div>)
}