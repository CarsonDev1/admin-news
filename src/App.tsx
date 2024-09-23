import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Dashboard from './pages/DashBoard';
import CreatePostModal from './components/CreatePostModal/CreatePostModal';
import Login from './pages/Login';
import Register from './pages/Register';
import UserManagement from './pages/UserManagement';
import Posts from './pages/Post';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import Customization from './pages/Customization';
import LoginLayout from './layout/LoginLayout';
import AdminLayout from './layout/AdminLayout';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginLayout>
              <Login />
            </LoginLayout>
          }
        />
        <Route
          path="/register"
          element={
            <LoginLayout>
              <Register />
            </LoginLayout>
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={
            <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/users"
          element={
            <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
              <UserManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/posts"
          element={
            <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
              <Posts />
            </AdminLayout>
          }
        />
        <Route
          path="/analytics"
          element={
            <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
              <Analytics />
            </AdminLayout>
          }
        />
        <Route
          path="/notifications"
          element={
            <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
              <Notifications />
            </AdminLayout>
          }
        />
        <Route
          path="/customization"
          element={
            <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
              <Customization />
            </AdminLayout>
          }
        />
      </Routes>

      {showCreatePost && (
        <CreatePostModal
          showCreatePost={showCreatePost}
          setShowCreatePost={setShowCreatePost}
          postContent={postContent}
          setPostContent={setPostContent}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      )}
    </Router>
  );
};

export default App;
