import React, { useEffect } from 'react'
import Workout from './Workout'
import { Flex } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks';

function Workouts() {

    const workouts = [
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

    const [value, setValue] = useLocalStorage({
        key: 'workouts',
        defaultValue: [],
    });

    useEffect(() => {
        setValue(workouts)
        console.log("setting localstate");
    }, [])

    return (
        <Flex justify="space-between" 
              align={"center"} 
              wrap={"wrap"}
              >
            {workouts.map((workout, i) => <Workout key={i} workout={workout} />)}
        </Flex>
    )
}

export default Workouts