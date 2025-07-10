import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SnippetList from './components/SnippetList';
import EditSnippet from './components/EditSnippet';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<SnippetList />} />
          <Route path="/edit/:id" element={<EditSnippet />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
