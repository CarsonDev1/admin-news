import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default LoginLayout;
