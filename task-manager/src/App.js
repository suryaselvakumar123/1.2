import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddTaskPage from './components/AddTaskPage';
import EditTaskPage from './components/EditTaskPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/edit-task/:taskId" element={<EditTaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
