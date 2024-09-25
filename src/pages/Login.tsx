// src/pages/Login.tsx
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginBody, LoginBodyType } from '../schemaValidations/auth.schema';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext); // Get login function from AuthContext

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const notifySuccess = () => toast.success('Logged in successfully!');
  const notifyError = (message: string) => toast.error(`Error: ${message}`);

  const onSubmit = async (data: LoginBodyType) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        notifyError(errorData.message);
        setIsLoading(false);
        return;
      }

      const result = await response.json();
      notifySuccess();

      login(result.token);

      setIsLoading(false);

      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      notifyError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1585241936939-be4099591252?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="w-full max-w-md p-8 bg-white shadow-lg bg-opacity-90 rounded-xl">
        <div className="mb-8 text-center">
          <img
            src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA&auto=format&fit=crop&w=1470&q=80"
            alt="Company Logo"
            className="w-auto h-20 mx-auto mb-4"
          />
          <h2 className="mb-2 text-3xl font-bold text-gray-800">
            Welcome Back!
          </h2>
          <p className="text-gray-600">
            Sign in to stay updated with the latest news
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin">
                  <FaSpinner />
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign Up Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
