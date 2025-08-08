import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SnippetList from './components/SnippetList';
import EditSnippet from './components/EditSnippet';
import LoginPage from './pages/LoginForm';
import RegisterPage from './pages/RegisterForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/snippetlist" element={<SnippetList />} />
          <Route path="/edit/:id" element={<EditSnippet />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
