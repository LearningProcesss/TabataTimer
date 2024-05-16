import React, { createContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NextUIProvider } from '@nextui-org/react'
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App.jsx'
import WorkoutOperations from './components/WorkoutOperations';
import './index.css'
import '@mantine/core/styles.css';
import LZString, { compress, compressToBase64, compressToEncodedURIComponent, compressToUTF16, compressToUint8Array } from 'lz-string'
import { useLocalStorage } from '@mantine/hooks';

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

export const contextState = {
  workouts: [],
  /**
     *
     * @param {Object} workout
     * @param {String} workout.id
     * @param {String} workout.name
     * @param {String} workout.note
     * @param {Number} workout.prepare
     * @param {Number} workout.work
     * @param {Number} workout.restCycle
     * @param {Number} workout.cycles
     * @param {Number} workout.sets
     * @param {Number} workout.restSet
    */
  handleWorkoutsChangeHandler: (workout) => { }
}

export const WorkoutsContext = createContext(contextState);

function WorkoutsContextProviderWrapper({ children }) {

  const [workouts, setWorkouts] = useState([]);

  const [value, setValue] = useLocalStorage({
    key: 'workouts',
    defaultValue: [],
  });

  useEffect(() => {
    console.log('WorkoutsContextProviderWrapper');

    handleConfigurationFromUrl();

  }, [])

  /**
   * 1. URL vince su LocalStorage
   * Arriva url che contiene la configurazione
   * Se valida
   * Salva in localstorage
   */
  function handleConfigurationFromUrl() {
    const params = new URLSearchParams(window.location.search);

    const configRaw = params.get("config");

    console.log("configRaw", configRaw);

    if (!configRaw) { console.log("configRaw null"); return; }


  }

  /**
     *
     * @param {Object} workout
     * @param {String} workout.id
     * @param {String} workout.note
     * @param {Number} workout.prepare
     * @param {Number} workout.work
     * @param {Number} workout.restCycle
     * @param {Number} workout.cycles
     * @param {Number} workout.sets
     * @param {Number} workout.restSet
    */
  function handleWorkoutsChangeHandler(workout) {
    const workountJson = JSON.stringify(workout);
    console.log('compress', compress(workountJson));
    console.log('compressToBase64', compressToBase64(workountJson));
    console.log('compressToUTF16', compressToUTF16(workountJson));
    console.log('compressToEncodedURIComponent', compressToEncodedURIComponent(workountJson));
    console.log('compressToUint8Array', compressToUint8Array(workountJson));

    setWorkouts(prevState => prevState.map(workoutState => {
      return workoutState.id == workout.id ? { ...workout } : workoutState;
    }));

    console.log(workouts);

    saveLocalState();
  }

  function saveLocalState() {
    setValue(workouts);
  }

  return <WorkoutsContext.Provider value={{ workouts, handleWorkoutsChangeHandler }}>{children}</WorkoutsContext.Provider>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <MantineProvider>
        <WorkoutsContextProviderWrapper>
          <RouterProvider router={router} />
        </WorkoutsContextProviderWrapper>
      </MantineProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
