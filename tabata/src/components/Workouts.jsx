import React from 'react'
import Workout from './Workout'
import { Group, Stack, Flex } from '@mantine/core'

function Workouts() {

    const workouts = [
        {
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