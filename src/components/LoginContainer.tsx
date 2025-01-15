import React from 'react';

interface LoginContainerProps {
  children: React.ReactNode;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default LoginContainer;
