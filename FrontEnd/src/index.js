import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdbreact/dist/css/mdb.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MantineProvider } from '@mantine/core';

const theme = createTheme(); // Create a default theme

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider>
  <DndProvider backend={HTML5Backend}>
  <ThemeProvider theme={theme}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThemeProvider>,
  </DndProvider>,
  </MantineProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
