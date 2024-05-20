import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { useLocalStorage } from '@mantine/hooks';
import { NextUIProvider } from '@nextui-org/react';
import { compressToBase64, decompressFromBase64 } from 'lz-string';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx';
import WorkoutOperations from './components/WorkoutOperations';
import { WorkoutValidator, WorkoutsValidator } from './api/Validator';
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
  createOrEditWorkout: (workout) => { },
  createNextWorkoutId: () => "",
  /**
   * 
   * @param {String} workoutId 
   */
  deleteWorkout: (workoutId) => { },
  downloadConfiguration: () => { },
  uploadConfiguration: () => { }
}

export const WorkoutsContext = createContext(contextState);

function WorkoutsContextProviderWrapper({ children }) {

  const [workouts, setWorkouts] = useState(() => {
    let initialState = handleConfigurationFromUrl();
    initialState ??= [];
    return initialState;
  });

  const [isSettedByUrl, setByUrl] = useState(false);

  const [localStorage, setLocalStorage] = useLocalStorage({
    key: 'workouts',
    defaultValue: [],
  });

  useEffect(() => {
    console.log("useEffect - workouts has changed - FLOW to build new url + storage");
    console.log('useEffect', workouts);
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
    if (workoutsDeser.length <= 0) { return; }
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
  const createOrEditWorkout = useCallback((workout) => {
    console.log('handleWorkoutsChangeHandler - workout', workout);
    console.log('handleWorkoutsChangeHandler - workouts', workouts);
    if (workouts?.findIndex(workoutState => workoutState.id === workout.id) >= 0) {
      console.log("found!");
      setWorkouts(prevState => prevState.map(workoutState => {
        return workoutState.id === workout.id ? { ...workout } : workoutState;
      }));
    } else {
      console.log("not found!");
      setWorkouts(prevstate => [...prevstate, workout])
    }
  }, [workouts]);

  const createNextWorkoutId = useCallback(() => crypto.randomUUID(), []);

  const deleteWorkout = useCallback((idWorkout) => {
    setWorkouts(prevState => prevState.filter(item => item.id !== idWorkout));
  }, []);

  const downloadConfiguration = useCallback(() => {
    let configuration = new Blob([JSON.stringify(workouts)], { type: 'text/json' });
    const url = window.URL.createObjectURL(configuration);
    let link = document.createElement("a");
    link.href = url;
    link.download = `configuration-${new Date().toLocaleDateString('it-IT', { hour: '2-digit', minute: '2-digit' }).replace(' ', '_').replace(',', '')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, []);

  const uploadConfiguration = useCallback(() => {
    let input = document.createElement("input");
    input.type = 'file';
    input.onchange = (e) => {
      console.log(e.target.files);
      e.target.files[0].text().then(content => console.log('content', content));
    };
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }, []);

  return <WorkoutsContext.Provider value={{ workouts, createOrEditWorkout, createNextWorkoutId, deleteWorkout, downloadConfiguration, uploadConfiguration }}>{children}</WorkoutsContext.Provider>;
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