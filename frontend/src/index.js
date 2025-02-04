import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App';
import NoteState from "./context/notes/notestate";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <NoteState>
        <App />
    </NoteState>
      </BrowserRouter>
      </React.StrictMode>
);
