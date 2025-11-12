
import React, { useState, useMemo } from 'react';
import type { Prompt } from './types';
import SearchInput from './components/SearchInput';
import PromptList from './components/PromptList';
import FloatingActionButton from './components/FloatingActionButton';
import PromptModal from './components/PromptModal';
import Toast from './components/Toast';

// Mock Data
const INITIAL_PROMPTS: Prompt[] = [
  {
    id: 'p1',
    title: '8K Sci-Fi Warrior',
    prompt: 'A female cyborg warrior in a futuristic city, intricate details, hyperrealistic, 8k, cinematic lighting, style of Blade Runner 2049',
  },
  {
    id: 'p2',
    title: 'Explain Quantum Computing',
    prompt: 'Explain quantum computing in simple terms, using an analogy that a high school student can understand. Cover superposition and entanglement.',
  },
  {
    id: 'p3',
    title: 'Surrealist Painting',
    prompt: 'A surrealist painting of a clock melting over a tree branch in a desert landscape, with a giant floating eye in the sky. Style of Salvador Dali.',
  },
  {
    id: 'p4',
    title: 'Weekly Meal Plan',
    prompt: 'Create a healthy and balanced 7-day meal plan for a busy professional. Include breakfast, lunch, and dinner. Focus on quick and easy recipes.',
  },
  {
    id: 'p5',
    title: 'Isometric Game Asset',
    prompt: 'An isometric view of a small, cozy potion shop, pixel art style, vibrant colors, magical glow from windows, detailed interior visible.',
  }
];

const App: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>(INITIAL_PROMPTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [prompts, searchTerm]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Prompt copied to clipboard!');
  };

  const handleOpenModal = (prompt: Prompt | null = null) => {
    setEditingPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPrompt(null);
  };

  const handleSavePrompt = (promptToSave: Omit<Prompt, 'id'> & { id?: string }) => {
    if (promptToSave.id) {
      setPrompts(prompts.map(p => p.id === promptToSave.id ? { ...p, ...promptToSave } as Prompt : p));
      showToast('Prompt updated successfully!');
    } else {
      const newPrompt: Prompt = {
        ...promptToSave,
        id: `p${Date.now()}`
      };
      setPrompts([newPrompt, ...prompts]);
      showToast('Prompt added successfully!');
    }
    handleCloseModal();
  };
  
  const handleDelete = (id: string) => {
    setPrompts(prompts.filter(p => p.id !== id));
    showToast('Prompt deleted.');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto max-w-2xl p-4 pb-24">
        <main>
          <div className="my-6">
            <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <PromptList
            prompts={filteredPrompts}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
            onCopy={handleCopy}
          />
        </main>
      </div>
      <FloatingActionButton onClick={() => handleOpenModal()} />
      <PromptModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePrompt}
        promptToEdit={editingPrompt}
      />
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
};

export default App;
