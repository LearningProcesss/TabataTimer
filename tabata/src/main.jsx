import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { useLocalStorage } from '@mantine/hooks';
import { NextUIProvider } from '@nextui-org/react';
import { compressToBase64, decompressFromBase64 } from 'lz-string';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx';
import WorkoutOperations from './components/WorkoutOperations';
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
  createNextWorkoutId: () => "",
  /**
   * 
   * @param {String} workoutId 
   */
  deleteWorkout: (workoutId) => {}
}

export const WorkoutsContext = createContext(contextState);

function WorkoutsContextProviderWrapper({ children }) {

  const [workouts, setWorkouts] = useState([]);

  const [isSettedByUrl, setByUrl] = useState(false);

  const [localStorage, setLocalStorage] = useLocalStorage({
    key: 'workouts',
    defaultValue: [],
  });

  const params = new URLSearchParams(window.location.search);

  const configRaw = params.get("config");

  // const workoutsFromUrl = useMemo(() => {


  //   const workoutsJson = decompressFromBase64(configRaw);

  //   const workoutsDeser = JSON.parse(workoutsJson);

  //   return workoutsDeser;
  // }, [configRaw]);

  useEffect(() => {
    console.log("useEffect - incoming - FLOW to build workouts from url");

    setByUrl(true);

    handleConfigurationFromUrl();

    console.log('isSetByUrl', isSettedByUrl);
  }, [configRaw])

  useEffect(() => {

    console.log("useEffect - workouts has changed - FLOW to build new url + storage");
    
    console.log('isSetByUrl', isSettedByUrl);

    if(isSettedByUrl) { return; }

    console.log('useEffect', workouts);

    // if(workouts.length === 0) { return; }


    setLocalStorage(workouts);

    const workoutsBase64 = compressToBase64(JSON.stringify(workouts));

    console.log('workoutsBase64', workoutsBase64);

    const params = new URLSearchParams();
    
    params.set("config", workoutsBase64);

    const newUrl = `${window.location.pathname}?${params}`;

    window.history.pushState({}, "", newUrl);

  }, [JSON.stringify(workouts)])

  function handleConfigurationFromUrl() {
    const params = new URLSearchParams(window.location.search);

    const configRaw = params.get("config");

    console.log("configRaw", configRaw);

    if (!configRaw || configRaw === null) { console.log("configRaw is null"); return; }

    const workoutsJson = decompressFromBase64(configRaw);

    const workoutsDeser = JSON.parse(workoutsJson);
  
    console.log('deserialized', workoutsDeser);

    if(workoutsDeser.length <= 0) { return; }

    // setWorkouts(workoutsDeser);

    return workoutsDeser;
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

    if (workouts?.findIndex(workoutState => workoutState.id === workout.id) >= 0) {
      console.log("found!");
      setWorkouts(prevState => prevState.map(workoutState => {
        return workoutState.id === workout.id ? { ...workout } : workoutState;
      }));
    } else {
      console.log("not found!");

      setWorkouts(prevstate => [...prevstate, workout])
    }
  }

  function createNextWorkoutId() {
    return crypto.randomUUID();
  }

  function deleteWorkout(idWorkout) {
    setWorkouts(prevState => prevState.filter(item => item.id !== idWorkout));
  }

  return <WorkoutsContext.Provider value={{ workouts, handleWorkoutsChangeHandler, createNextWorkoutId, deleteWorkout }}>{children}</WorkoutsContext.Provider>;
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