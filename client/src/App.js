import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/Pages/HomePage/HomePage';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
    <div className='App'>
      <ToastContainer position="top-center" autoClose={3500} />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/game" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
    </Provider>
  );
};

export default App;
