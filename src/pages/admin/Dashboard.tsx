import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Scale, Settings, BookOpen } from 'lucide-react';

const modules = [
  {
    title: "Blog Posts",
    icon: FileText,
    description: "Manage blog articles and publications",
    link: "/admin/blog"
  },
  {
    title: "Team Members",
    icon: Users,
    description: "Manage attorney and staff profiles",
    link: "/admin/team"
  },
  {
    title: "Practice Areas",
    icon: Scale,
    description: "Update practice area information",
    link: "/admin/practice-areas"
  },
  {
    title: "About Content",
    icon: BookOpen,
    description: "Edit about page content",
    link: "/admin/about"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your website content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <Link
              key={index}
              to={module.link}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <module.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
              <p className="text-gray-600">{module.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <Link
                to="/admin/settings"
                className="flex items-center text-primary hover:text-primary-light"
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-primary text-white rounded-md hover:bg-primary-light transition-colors">
                Create New Blog Post
              </button>
              <button className="p-4 bg-primary text-white rounded-md hover:bg-primary-light transition-colors">
                Add Team Member
              </button>
              <button className="p-4 bg-primary text-white rounded-md hover:bg-primary-light transition-colors">
                Update Practice Areas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}