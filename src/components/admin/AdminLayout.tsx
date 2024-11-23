import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Scale, Home, FileText, Users, BookOpen, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Team Members', href: '/admin/team', icon: Users },
  { name: 'Practice Areas', href: '/admin/practice-areas', icon: Scale },
  { name: 'About Content', href: '/admin/about', icon: BookOpen },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-primary text-white">
        <div className="flex items-center h-16 px-4">
          <Scale className="w-8 h-8" />
          <span className="ml-2 text-xl font-bold">JUSTICE CMS</span>
        </div>
        <nav className="mt-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm ${
                location.pathname === item.href
                  ? 'bg-primary-light'
                  : 'hover:bg-primary-light'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-sm w-full hover:bg-primary-light mt-8"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <Outlet />
      </div>
    </div>
  );
}