import React, { useState, useEffect } from 'react';
import { FiUsers, FiFileText, FiBarChart2, FiBell, FiSettings, FiPlusCircle, FiX } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface User {
  id: number;
  name: string;
  role: string;
  lastActive: string;
}

interface Post {
  id: number;
  title: string;
  category: string;
  views: number;
  likes: number;
}

interface Notification {
  id: number;
  message: string;
  time: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');

  useEffect(() => {
    // Simulating data fetch
    setUsers([
      { id: 1, name: 'John Doe', role: 'Editor', lastActive: '2023-06-15' },
      { id: 2, name: 'Jane Smith', role: 'Admin', lastActive: '2023-06-14' },
      { id: 3, name: 'Bob Johnson', role: 'Writer', lastActive: '2023-06-13' },
    ]);

    setPosts([
      { id: 1, title: 'Breaking News: AI Breakthrough', category: 'Technology', views: 1500, likes: 230 },
      { id: 2, title: 'Global Climate Summit Concludes', category: 'Environment', views: 1200, likes: 180 },
      { id: 3, title: 'New Study Reveals Health Benefits of Coffee', category: 'Health', views: 980, likes: 150 },
    ]);

    setNotifications([
      { id: 1, message: 'New user registered', time: '2 hours ago' },
      { id: 2, message: 'Post "Breaking News: AI Breakthrough" received 100 new likes', time: '3 hours ago' },
      { id: 3, message: 'System update scheduled for tomorrow', time: '1 day ago' },
    ]);
  }, []);

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'User Activity',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Quick Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Posts</p>
            <p className="text-2xl font-bold">{posts.length}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">User Activity</h3>
        <Line data={chartData} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Latest News</h3>
        <ul className="space-y-2">
          {posts.slice(0, 3).map((post) => (
            <li key={post.id} className="text-sm">
              <span className="font-semibold">{post.title}</span>
              <span className="text-gray-600 ml-2">{post.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">User Management</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Last Active</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{user.lastActive}</td>
                <td className="p-2">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button className="text-red-500 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const renderPostManagement = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Post Management</h3>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowCreatePost(true)}
      >
        <FiPlusCircle className="inline-block mr-2" />
        Create New Post
      </button>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Views</th>
            <th className="p-2 text-left">Likes</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b">
              <td className="p-2">{post.title}</td>
              <td className="p-2">{post.category}</td>
              <td className="p-2">{post.views}</td>
              <td className="p-2">{post.likes}</td>
              <td className="p-2">
                <button className="text-blue-500 hover:underline mr-2">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAnalytics = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">Post Performance</h4>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Post</th>
                <th className="p-2 text-left">Views</th>
                <th className="p-2 text-left">Likes</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="p-2">{post.title}</td>
                  <td className="p-2">{post.views}</td>
                  <td className="p-2">{post.likes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">User Engagement</h4>
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Notifications</h3>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex items-start">
            <FiBell className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p>{notification.message}</p>
              <p className="text-sm text-gray-600">{notification.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderCustomization = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Customization</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Theme Color</label>
          <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>Light</option>
            <option>Dark</option>
            <option>Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Layout</label>
          <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>Default</option>
            <option>Compact</option>
            <option>Wide</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
      </div>
    </div>
  );

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'script',
    'indent',
    'direction',
    'color', 'background',
    'font',
    'align',
    'link', 'image', 'video'
  ];

  const renderCreatePost = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Post</h3>
          <button
            onClick={() => setShowCreatePost(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Template</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="">Choose a template</option>
            <option value="news">News Article</option>
            <option value="blog">Blog Post</option>
            <option value="review">Product Review</option>
          </select>
          <ReactQuill
            theme="snow"
            value={postContent}
            onChange={setPostContent}
            modules={modules}
            formats={formats}
            className="h-64 mb-4"
          />
        </div>
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => setShowCreatePost(false)}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUserManagement();
      case 'posts':
        return renderPostManagement();
      case 'analytics':
        return renderAnalytics();
      case 'notifications':
        return renderNotifications();
      case 'customization':
        return renderCustomization();
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        </div>
        <ul className="mt-4">
          {
            [
              { id: 'dashboard', icon: FiBarChart2, label: 'Dashboard' },
              { id: 'users', icon: FiUsers, label: 'Users' },
              { id: 'posts', icon: FiFileText, label: 'Posts' },
              { id: 'analytics', icon: FiBarChart2, label: 'Analytics' },
              { id: 'notifications', icon: FiBell, label: 'Notifications' },
              { id: 'customization', icon: FiSettings, label: 'Customization' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full p-4 ${activeTab === item.id ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <item.icon className="mr-2" />
                  {item.label}
                </button>
              </li>
            ))
          }
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          {renderContent()}
        </div>
      </main>
      {showCreatePost && renderCreatePost()}
    </div>
  );
};

export default App;
