// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App'; // Ensure this path is correct
import App from './App';
import './index.css'; // Your CSS file


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
