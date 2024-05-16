import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { NextUIProvider } from '@nextui-org/react'
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App.jsx'
import WorkoutOperations from './components/WorkoutOperations';
import './index.css'
import '@mantine/core/styles.css';

const router = createBrowserRouter([
  {
    path: "/example",
    element: <div>Hello world!</div>,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/workouts/:workoutId",
    element: <WorkoutOperations />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <MantineProvider>
        <RouterProvider router={router} />
        {/* <App /> */}
      </MantineProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
