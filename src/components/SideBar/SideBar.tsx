import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiUsers,
  FiFileText,
  FiBarChart2,
  FiBell,
  FiSettings,
  FiLogIn,
} from 'react-icons/fi';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>
      <ul className="mt-4">
        {[
          {
            id: 'dashboard',
            icon: FiBarChart2,
            label: 'Dashboard',
            path: '/dashboard',
          },
          { id: 'users', icon: FiUsers, label: 'Users', path: '/users' },
          { id: 'posts', icon: FiFileText, label: 'Posts', path: '/posts' },
          {
            id: 'analytics',
            icon: FiBarChart2,
            label: 'Analytics',
            path: '/analytics',
          },
          {
            id: 'notifications',
            icon: FiBell,
            label: 'Notifications',
            path: '/notifications',
          },
          {
            id: 'customization',
            icon: FiSettings,
            label: 'Customization',
            path: '/customization',
          },
          { id: 'login', icon: FiLogIn, label: 'Login', path: '/login' },
        ].map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center w-full p-4 ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2" />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
