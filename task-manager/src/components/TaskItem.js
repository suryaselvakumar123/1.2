import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {

  const getPriorityStyles = () => {
    switch(task.priority) {
      case 'High':
        return {
          bgColor: 'bg-red-100 text-red-800',
          icon: '🚨'
        };
      case 'Medium':
        return {
          bgColor: 'bg-yellow-100 text-yellow-800',
          icon: '⚠️'
        };
      default:
        return {
          bgColor: 'bg-green-100 text-green-800',
          icon: '✅'
        };
    }
  };

  const { bgColor, icon } = getPriorityStyles();

  return (
    <div className="task-item group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 p-6 mb-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10">
      
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{task.task}</h3>
        </div>

       
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bgColor}`}>
          {icon} {task.priority}
        </div>

      
        <div className="mt-4 text-sm text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 011 1v1h1a1 1 0 110 2H7v1a1 1 0 11-2 0v-1H4a1 1 0 110-2h1V8a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>{task.dueDate}</span>
        </div>

     
        {task.notes && (
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <p className="flex-1">{task.notes}</p>
            </div>
          </div>
        )}

        {task.file && (
          <div className="mt-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>

            <a href={task.file} className="text-blue-500" target="_blank" rel="noopener noreferrer">
              {task.file.split('/').pop()}
            </a>
          </div>
        )}
        
        
        <div className="mt-6 flex space-x-3">
          <button
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out"
            onClick={() => onEdit(task)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
          <button
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out"
            onClick={() => onDelete(task._id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-1.724-1.447A1 1 0 0011 2H9zm0 4h2V4H9v2z" clipRule="evenodd" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
