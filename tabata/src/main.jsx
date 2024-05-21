import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NextUIProvider } from '@nextui-org/react';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx';
import { WorkoutsContext, WorkoutsContextProviderWrapper } from './hooks/workoutContext';
import WorkoutPlayer from './components/WorkoutPlayer';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    element: <WorkoutPlayer />,
  }
]);

const BrowserRouterProviderWithContext = ({ children }) => {

  const { workoutById } = useContext(WorkoutsContext);

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
      loader: workoutById,
      element: <WorkoutPlayer />,
    }
  ]);

  return (
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <MantineProvider>
        <Notifications position="top-right" zIndex={1000} />
        <WorkoutsContextProviderWrapper>
          {/* <RouterProvider router={router} /> */}
          <BrowserRouterProviderWithContext />
        </WorkoutsContextProviderWrapper>
      </MantineProvider>
    </NextUIProvider>
  </React.StrictMode>,
)