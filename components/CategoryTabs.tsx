
import React from 'react';

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
