
import React from 'react';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50 animate-fade-in-out">
      {message}
    </div>
  );
};

// Add keyframes for animation in a style tag or a global CSS file.
// For simplicity in this setup, let's use tailwind.config.js for custom animations.
// Or, we can just define it in index.html for this simple case.
// The effect is a simple fade in and out. This will be added via inline styles or a global CSS file.
// Since we don't have a CSS file, we'll just let the class `animate-fade-in-out` be a placeholder.
// A real app would define this animation. For now, it will appear and disappear without fade.
// Let's add the keyframes to index.html for a better UX.
// A better way is to add this to the tailwind config, but without access to that, index.html is the next best thing.

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeInOut {
    0%, 100% { opacity: 0; transform: translateY(20px) translateX(-50%); }
    10%, 90% { opacity: 1; transform: translateY(0) translateX(-50%); }
  }
  .animate-fade-in-out {
    animation: fadeInOut 3s ease-in-out forwards;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fade-in {
    animation: fadeIn 0.2s ease-out forwards;
  }
`;
document.head.appendChild(style);


export default Toast;
