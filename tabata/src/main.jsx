import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx';
import { WorkoutsContextProviderWrapper } from './hooks/workoutContext';
import WorkoutOperations from './components/WorkoutOperations';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import './index.css';

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
        <Notifications position="top-right" zIndex={1000} />
        <WorkoutsContextProviderWrapper>
          <RouterProvider router={router} />
        </WorkoutsContextProviderWrapper>
      </MantineProvider>
    </NextUIProvider>
  </React.StrictMode>,
)