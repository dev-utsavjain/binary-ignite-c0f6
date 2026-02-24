import { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import TaskInput from '../components/taskInput';
import FilterBar from '../components/filterBar';
import TaskList from '../components/taskList';
// import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const Home = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', completed: false },
    { id: 2, title: 'Review design mockups', completed: true },
    { id: 3, title: 'Schedule team meeting', completed: false },
    { id: 4, title: 'Update documentation', completed: false },
    { id: 5, title: 'Send weekly report', completed: true },
  ]);
  const [filter, setFilter] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // TODO: Fetch tasks from API using src/config/api.js
    // const fetchTasks = async () => {
    //   try {
    //     const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TASKS}`);
    //     const data = await response.json();
    //     setTasks(data);
    //   } catch (error) {
    //     console.error('Error fetching tasks:', error);
    //   }
    // };
    // fetchTasks();
    
    setIsLoaded(true);
  }, []);

  const handleAddTask = (title) => {
    // TODO: POST to API using src/config/api.js
    // const addTask = async () => {
    //   try {
    //     const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TASKS}`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ title, completed: false }),
    //     });
    //     const newTask = await response.json();
    //     setTasks(prev => [...prev, newTask]);
    //   } catch (error) {
    //     console.error('Error adding task:', error);
    //   }
    // };
    // addTask();

    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleToggleTask = (id) => {
    // TODO: PATCH to API using src/config/api.js
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    // TODO: DELETE to API using src/config/api.js
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleEditTask = (id, newTitle) => {
    // TODO: PATCH to API using src/config/api.js
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const handleClearCompleted = () => {
    // TODO: DELETE completed tasks via API using src/config/api.js
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const itemsLeft = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-white border-b-2 border-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 
                className={`text-5xl md:text-7xl lg:text-9xl font-bold text-black mb-6 tracking-tight ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}
                style={{ fontFamily: 'Playfair Display, serif', animationDelay: '0.1s' }}
              >
                TaskFlow
              </h1>
              <p 
                className={`text-lg md:text-xl text-black uppercase tracking-[0.3em] ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}
                style={{ animationDelay: '0.3s' }}
              >
                Simplify your workflow
              </p>
              <div 
                className={`mt-8 w-24 h-0.5 bg-black mx-auto ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}
                style={{ animationDelay: '0.5s' }}
              />
            </div>
          </div>
        </section>

        {/* Task Input Section */}
        <TaskInput onAddTask={handleAddTask} />
        
        {/* Filter Bar */}
        <FilterBar 
          filter={filter} 
          onFilterChange={setFilter} 
          itemsLeft={itemsLeft} 
        />
        
        {/* Task List */}
        <TaskList 
          tasks={filteredTasks} 
          onToggle={handleToggleTask} 
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </main>
      
      <Footer 
        completedCount={completedCount} 
        onClearCompleted={handleClearCompleted} 
      />
    </div>
  );
};

export default Home;
