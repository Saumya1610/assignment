import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/Pages/HomePage/HomePage';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import { useSelector } from 'react-redux';
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

const GuardedGamePageWrapper = () => {
  const username = useSelector(state => state.user.username);
  useEffect(() => {
    if (!username) {
      toast.error('Please enter a username first.');
    }
  }, [username]);

  return username ? <HomePage /> : <Navigate to="/" />;
};


export default App;
