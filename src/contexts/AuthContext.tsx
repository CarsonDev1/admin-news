// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái loading để chờ xác thực

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      axios
        .get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsAuthenticated(true); // Đặt trạng thái đăng nhập là true nếu token hợp lệ
            setToken(storedToken);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem('token'); // Xóa token nếu không hợp lệ
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem('token'); // Xóa token nếu có lỗi
        })
        .finally(() => {
          setLoading(false); // Kết thúc trạng thái loading
        });
    } else {
      setLoading(false); // Nếu không có token, kết thúc loading
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem('token', newToken); // Lưu token vào localStorage
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Xóa token khỏi localStorage khi logout
  };

  if (loading) {
    // Hiển thị màn hình loading trong khi đang xác thực
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
