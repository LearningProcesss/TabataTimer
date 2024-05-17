import React, { createContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NextUIProvider } from '@nextui-org/react'
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App.jsx'
import WorkoutOperations from './components/WorkoutOperations';
import './index.css'
import '@mantine/core/styles.css';
import LZString, { compress, compressToBase64, decompressFromBase64 } from 'lz-string'
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
  handleWorkoutsChangeHandler: (workout) => { },
  createNextWorkoutId: () => ""
}

export const WorkoutsContext = createContext(contextState);

function WorkoutsContextProviderWrapper({ children }) {

  const [workouts, setWorkouts] = useState([]);

  const [localStorage, setLocalStorage] = useLocalStorage({
    key: 'workouts',
    defaultValue: [],
  });

  const workoutsFake = [
    {
      id: crypto.randomUUID(),
      name: "hollow",
      note: "motus",
      prepare: 10,
      work: 20,
      restCycle: 10,
      cycles: 4,
      sets: 1,
      restSet: 20,
      set: {
        count: 2,
        rest: 10,
        cycles: {
          count: 4,
          work: 20,
          rest: 10
        }
      }
    },
    {
      name: "arm lifting repeaters",
      note: "90%",
      prepare: 10,
      work: 7,
      restCycle: 3,
      cycles: 5,
      sets: 1,
      restSet: 20,
    },
    {
      name: "arm lifting repeaters",
      note: "90%",
      prepare: 10,
      work: 7,
      restCycle: 3,
      cycles: 5,
      sets: 1,
      restSet: 20,
    },
    {
      name: "arm lifting repeaters",
      note: "90%",
      prepare: 10,
      work: 7,
      restCycle: 3,
      cycles: 5,
      sets: 1,
      restSet: 20,
    },
    {
      name: "arm lifting repeaters",
      note: "90%",
      prepare: 10,
      work: 7,
      restCycle: 3,
      cycles: 5,
      sets: 1,
      restSet: 20,
    },
    {
      name: "arm lifting repeaters",
      note: "90%",
      prepare: 10,
      work: 7,
      restCycle: 3,
      cycles: 5,
      sets: 1,
      restSet: 20,
    }
  ]

  useEffect(() => {
    console.log('WorkoutsContextProviderWrapper');

    handleConfigurationFromUrl();

    // loadConfigurationFromStorage();

  }, [])

  useEffect(() => {

    console.log('useEffect', workouts);

    if(workouts.length === 0) { return; }

    console.log("useEffect - workouts has changed - FLOW to build new url + storage");

    setLocalStorage(workouts);

    const workoutsBase64 = compressToBase64(JSON.stringify(workouts));

    console.log('workoutsBase64', workoutsBase64);

    const params = new URLSearchParams();
    
    params.set("config", workoutsBase64);

    const newUrl = `${window.location.pathname}?${params}`;

    window.history.pushState({}, "", newUrl);

  }, [JSON.stringify(workouts)])

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

    const workoutsJson = decompressFromBase64(configRaw);

    const workoutsDeser = JSON.parse(workoutsJson);
  
    console.log('deserialized', workoutsDeser);

    setWorkouts(workoutsDeser);
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
    // console.log('compress', compress(workountJson));
    // console.log('compressToBase64', compressToBase64(workountJson));
    // console.log('compressToUTF16', compressToUTF16(workountJson));
    // console.log('compressToEncodedURIComponent', compressToEncodedURIComponent(workountJson));
    // console.log('compres{sToUint8Array', compressToUint8Array(workountJson));

    if (workouts.findIndex(workoutState => workoutState.id === workout.id) >= 0) {
      console.log("found!");
      setWorkouts(prevState => prevState.map(workoutState => {
        return workoutState.id === workout.id ? { ...workout } : workoutState;
      }));
    } else {
      console.log("not found!");

      setWorkouts(prevstate => [...prevstate, workout])
    }

    // console.log(workouts);

    // saveLocalState();
  }

  function createNextWorkoutId() {
    return crypto.randomUUID();
  }

  function saveLocalState() {
    setLocalStorage(workouts);
  }

  return <WorkoutsContext.Provider value={{ workouts, handleWorkoutsChangeHandler, createNextWorkoutId }}>{children}</WorkoutsContext.Provider>;
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

export const useOnboardingContext = () => {
  const workoutContext = React.useContext(WorkoutsContext);
  if (workoutContext === undefined) {
    throw new Error('useworkoutContext must be inside a OnboardingProvider');
  }
  return workoutContext;
};