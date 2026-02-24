import { useState } from 'react';
import Icon from './icon';

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleSaveEdit = () => {
    if (editValue.trim() && editValue !== task.title) {
      onEdit(task.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditValue(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div className={`group bg-white border-2 border-black p-4 md:p-6 transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
            task.completed ? 'bg-black' : 'bg-white hover:bg-gray-100'
          }`}
        >
          {task.completed && (
            <Icon name="Check" className="w-4 h-4 text-white" />
          )}
        </button>
        
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 px-2 py-1 bg-white border-b-2 border-black text-black text-lg focus:outline-none"
            style={{ fontFamily: 'Playfair Display, serif' }}
          />
        ) : (
          <span
            className={`flex-1 text-lg text-black transition-all duration-300 ${
              task.completed ? 'line-through' : ''
            }`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {task.title}
          </span>
        )}
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white text-black transition-all duration-300"
            >
              <Icon name="Pencil" className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white text-black transition-all duration-300"
          >
            <Icon name="Trash2" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
