import { useContext } from 'react'
import Workout from './Workout'
import { WorkoutsContext } from '../main'
import WorkoutOperations from './WorkoutOperations'
import { ActionIcon, Affix, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoMdAdd } from "react-icons/io";

function Workouts() {

    const { workouts } = useContext(WorkoutsContext);

    const [opened, { open, close }] = useDisclosure(false);


    // const [value, setValue] = useLocalStorage({
    //     key: 'workouts',
    //     defaultValue: [],
    // });

    // useEffect(() => {
    //     setValue(workouts)
    //     console.log("setting localstate");
    // }, [])

    return (
        <>
            <Flex justify="space-between"
                align={"center"}
                wrap={"wrap"}
            >
                {workouts.map((workout, i) => <Workout key={i} workout={workout} />)}
            </Flex>
            <Affix position={{ bottom: 40, right: 40 }}>
                <ActionIcon onClick={open} color="blue" radius="xl" size={60}>
                    {/* <IconPhone stroke={1.5} size={30} /> */}
                    <IoMdAdd size={30} />
                </ActionIcon>
            </Affix>
            <WorkoutOperations opened={opened} onClose={close} workout={null} />
        </>

    )
}

export default Workouts