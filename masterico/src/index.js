import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App';

// API base URL is taken from the REACT_APP_API_URL environment variable at build time.
// - Local development: defaults to http://localhost:8000
// - Production (Render): set REACT_APP_API_URL to the backend service URL.
// If the value has no scheme, https:// is assumed (Render exposes only the host).
const rawApi = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const apiBase = /^https?:\/\//.test(rawApi) ? rawApi : `https://${rawApi}`;
axios.defaults.baseURL = apiBase.replace(/\/+$/, '');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
