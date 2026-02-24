import TaskCard from './taskCard';
import Icon from './icon';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-8 bg-white border-2 border-black flex items-center justify-center">
              <Icon name="ClipboardList" className="w-10 h-10 text-black" />
            </div>
            <h3 
              className="text-2xl md:text-3xl font-bold text-black mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              No tasks yet
            </h3>
            <p className="text-gray-600 uppercase tracking-widest text-sm">
              Add your first task above to get started
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TaskCard
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaskList;
