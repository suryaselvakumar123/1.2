import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2, Edit, Trash2, Circle, Search, Filter, ArrowUpDown } from 'lucide-react';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Due Date');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://task-manager-backend-a15g.onrender.com/api/tasks');
        setTasks(response.data);
        setFilteredTasks(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://task-manager-backend-a15g.onrender.com/api/tasks/${taskId}`);
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      await axios.put(`https://task-manager-backend-a15g.onrender.com/api/tasks/${task._id}`, updatedTask);
      const updatedTasks = tasks.map(t => t._id === task._id ? updatedTask : t);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };

  const getPriorityColor = (priority, isCompleted) => {
    if (isCompleted) return 'bg-gray-200 text-gray-500 line-through';
    
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterTasks(term, filter, sortBy);
  };

  const handleFilter = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    filterTasks(searchTerm, selectedFilter, sortBy);
  };

  const handleSort = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    filterTasks(searchTerm, filter, selectedSort);
  };

  const filterTasks = (searchTerm, filter, sortBy) => {
    let filtered = tasks.filter(task => 
      task.task.toLowerCase().includes(searchTerm) || (task.notes && task.notes.toLowerCase().includes(searchTerm))
    );

    if (filter === 'Completed') {
      filtered = filtered.filter(task => task.isCompleted);
    } else if (filter === 'Incomplete') {
      filtered = filtered.filter(task => !task.isCompleted);
    }

    if (sortBy === 'Priority') {
      filtered = filtered.sort((a, b) => {
        const priorityOrder = ['High', 'Medium', 'Low'];
        return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
      });
    } else if (sortBy === 'Due Date') {
      filtered = filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    setFilteredTasks(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-xl">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            My Tasks
          </h1>
          <Link
            to="/add-task"
            className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <span>+ Add New Task</span>
          </Link>
        </div>

        <div className="mb-6 flex space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <div className="relative">
            <select
              value={filter}
              onChange={handleFilter}
              className="appearance-none w-full pl-10 pr-6 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSort}
              className="appearance-none w-full pl-10 pr-6 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Due Date">Due Date</option>
              <option value="Priority">Priority</option>
            </select>
            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="mb-4">
              <Circle className="text-gray-400 w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500 text-xl">No tasks found. Create your first task!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map(task => (
              <div
                key={task._id}
                className={`
                  bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out
                  flex items-center border-l-4
                  ${task.isCompleted 
                    ? 'border-gray-300 opacity-60' 
                    : task.priority === 'High' 
                      ? 'border-red-500' 
                      : task.priority === 'Medium' 
                        ? 'border-yellow-500' 
                        : 'border-green-500'
                  }
                `}
              >
                <button 
                  onClick={() => handleToggleComplete(task)}
                  className="mr-4 focus:outline-none group"
                >
                  {task.isCompleted ? (
                    <CheckCircle2 className="text-green-500 w-6 h-6" />
                  ) : (
                    <Circle className="text-gray-300 w-6 h-6 group-hover:text-green-500 transition" />
                  )}
                </button>

                <div className="flex-grow">
                  <div className="text-xl font-semibold">{task.task}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(task.dueDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="text-sm text-gray-500">{task.notes}</div>
                  {task.file && (
                    <a
                      href={`https://task-manager-backend-a15g.onrender.com/${task.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm"
                    >
                      View attachment
                    </a>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => navigate(`/edit-task/${task._id}`)}
                    className="text-indigo-500 hover:text-indigo-700 focus:outline-none"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
