import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    title: "Understanding Corporate Law Basics",
    excerpt: "A comprehensive guide to corporate law fundamentals...",
    author: "Sarah Johnson",
    status: "Published",
    date: "2024-03-15"
  },
  // Add more mock posts as needed
];

export default function BlogPosts() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light">
          <Plus className="w-5 h-5 mr-2" />
          New Post
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Title</th>
              <th className="text-left py-4">Author</th>
              <th className="text-left py-4">Status</th>
              <th className="text-left py-4">Date</th>
              <th className="text-right py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockPosts.map((post) => (
              <tr key={post.id} className="border-b">
                <td className="py-4">
                  <div>
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.excerpt}</div>
                  </div>
                </td>
                <td className="py-4">{post.author}</td>
                <td className="py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {post.status}
                  </span>
                </td>
                <td className="py-4">{post.date}</td>
                <td className="py-4">
                  <div className="flex justify-end space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}