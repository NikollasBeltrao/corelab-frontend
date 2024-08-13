import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import RegisterPage from '../pages/Register';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
