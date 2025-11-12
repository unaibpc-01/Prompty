
import React, { useState, useEffect } from 'react';
import type { Prompt } from '../types';
import { CloseIcon } from './icons';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: Omit<Prompt, 'id'> & { id?: string }) => void;
  promptToEdit: Prompt | null;
}

const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose, onSave, promptToEdit }) => {
  const [title, setTitle] = useState('');
  const [promptText, setPromptText] = useState('');

  useEffect(() => {
    if (promptToEdit) {
      setTitle(promptToEdit.title);
      setPromptText(promptToEdit.prompt);
    } else {
      setTitle('');
      setPromptText('');
    }
  }, [promptToEdit, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !promptText) {
      alert('Please fill all fields');
      return;
    }
    onSave({
      id: promptToEdit?.id,
      title,
      prompt: promptText,
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-gray-700 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close modal"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">{promptToEdit ? 'Edit Prompt' : 'Add New Prompt'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-1">Prompt</label>
            <textarea
              id="prompt"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white h-40 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition font-semibold"
            >
              Save Prompt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptModal;
