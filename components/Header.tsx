
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-4">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Prompt Saver
      </h1>
      <p className="text-gray-400 mt-1">Your personal library of powerful prompts</p>
    </header>
  );
};

export default Header;
