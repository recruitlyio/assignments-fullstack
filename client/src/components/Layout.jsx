import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <h1 className="text-2xl font-bold text-blue-600">
          Tech Interview Que. Generator
        </h1>
      </header>
      <main className="flex-grow bg-gray-50 pt-20 pb-12 overflow-y-auto">
        {children}
      </main>
      <footer className="bg-white text-center py-4 shadow-inner fixed bottom-0 left-0 right-0">
        <p className="text-sm text-gray-500">
          &copy; 2025 Tech Interview Que. Generator. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
