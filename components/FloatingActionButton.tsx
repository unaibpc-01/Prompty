
import React from 'react';
import { PlusIcon } from './icons';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Add new prompt"
      className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform transition-transform"
    >
      <PlusIcon className="h-6 w-6" />
    </button>
  );
};

export default FloatingActionButton;
