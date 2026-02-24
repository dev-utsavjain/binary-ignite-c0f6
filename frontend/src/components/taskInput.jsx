import { useState } from 'react';
import Icon from './icon';

const TaskInput = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTask(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-6 py-4 bg-white border-2 border-black text-black text-lg placeholder:text-gray-400 focus:outline-none focus:ring-0 transition-all duration-300"
                style={{ fontFamily: 'Playfair Display, serif' }}
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-8 py-4 bg-black text-white font-medium text-sm uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon name="Plus" className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TaskInput;
