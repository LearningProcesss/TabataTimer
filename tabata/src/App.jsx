import { createContext, useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home';
import WorkoutOperations from './components/WorkoutOperations';
import './App.css'

const myContext = {
}

const Context = createContext(myContext);

const router = createBrowserRouter([
  {
    path: "/example",
    element: <div>Hello world!</div>,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/workouts/:workoutId",
    element: <WorkoutOperations />,
  }
]);

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    console.log(params.get("config"))
  }, []);

  return (
    <>
      <Home />
    </>
  )
}

export default App
