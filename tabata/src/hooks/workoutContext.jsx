import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { compressToBase64, decompressFromBase64 } from 'lz-string';
import { WorkoutsValidator } from '../api/Validator';
import { notifications } from '@mantine/notifications';
import { VscError } from "react-icons/vsc";

const internalState = {
    workouts: [],
    /**
       * @param {Workout} workout
      */
    createOrEditWorkout: (workout) => { },
    createNextWorkoutId: () => "",
    /**
     * 
     * @param {String} workoutId 
     */
    deleteWorkout: (workoutId) => { },
    downloadConfiguration: () => { },
    uploadConfiguration: () => { },
    /**
     * 
     * @param {String} workoutId
     * @returns {Workout} 
     */
    workoutById: ({ workoutId }) => { }

    /**
       * @typedef {Object} Workout
       * @property {String} workout.id
       * @property {String} workout.name
       * @property {String} workout.note
       * @property {Number} workout.prepare
       * @property {Number} workout.work
       * @property {Number} workout.restCycle
       * @property {Number} workout.cycles
       * @property {Number} workout.sets
       * @property {Number} workout.restSet
    */
}

export const WorkoutsContext = createContext(internalState);

export const WorkoutsContextProviderWrapper = ({ children }) => {

    const [workouts, setWorkouts] = useState(() => {
        let initialState = handleConfigurationFromUrl();
        initialState ??= [];
        return initialState;
    });

    const [localStorage, setLocalStorage] = useLocalStorage({
        key: 'workouts',
        defaultValue: [],
    });

    useEffect(() => {
        setLocalStorage(workouts);

        const workoutsBase64 = compressToBase64(JSON.stringify(workouts));

        const params = new URLSearchParams();

        params.set("config", workoutsBase64);

        const newUrl = `${window.location.pathname}?${params}`;

        window.history.pushState({}, "", newUrl);
    }, [JSON.stringify(workouts)])

    function handleConfigurationFromUrl() {
        const params = new URLSearchParams(window.location.search);

        const configRaw = params.get("config");

        if (!configRaw || configRaw === null) { console.log("configRaw is null"); return []; }

        const workoutsJson = decompressFromBase64(configRaw);

        const workoutsDeser = JSON.parse(workoutsJson);

        if (workoutsDeser.length <= 0) { return []; }

        return workoutsDeser;
    }

    const createOrEditWorkout = useCallback((workout) => {
        if (workouts?.findIndex(workoutState => workoutState.id === workout.id) >= 0) {
            setWorkouts(prevState => prevState.map(workoutState => {
                return workoutState.id === workout.id ? { ...workout } : workoutState;
            }));
        } else {
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
        input.onchange = async (e) => {
            const textContent = await e.target.files[0].text();
            const workoutsFromFileResult = await WorkoutsValidator.safeParseAsync(JSON.parse(textContent));
            if (!workoutsFromFileResult.success) {
                notifications.show({
                    title: 'Import configuration',
                    message: 'errors ' + workoutsFromFileResult.error,
                    icon: <VscError />,
                    color: 'red',
                    autoClose: 5000,

                });

                return;
            }
            setWorkouts(workoutsFromFileResult.data);
        };
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }, []);

    const workoutById = useCallback(({ params: { workoutId } }) => {
        console.log('workoutById', workoutId);
        const workout = workouts.find(workout => workout.id === workoutId);
        console.log('workoutById', workout);
        return { workout };
    }, [workouts]);

    return <WorkoutsContext.Provider value={{ workouts, createOrEditWorkout, createNextWorkoutId, deleteWorkout, downloadConfiguration, uploadConfiguration, workoutById }}>{children}</WorkoutsContext.Provider>;
}

export const useWorkoutContext = () => {
    const workoutContext = React.useContext(WorkoutsContext);
    if (workoutContext === undefined) {
        throw new Error('useworkoutContext must be inside a OnboardingProvider');
    }
    return workoutContext;
};