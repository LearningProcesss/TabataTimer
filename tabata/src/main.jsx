import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
