import { ActionIcon, Affix, Flex, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { IoMdAdd } from "react-icons/io";
import { WorkoutsContext } from '../main';
import Workout from './Workout';
import WorkoutOperations from './WorkoutOperations';
import { motion } from 'framer-motion';

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
                {workouts?.map((workout, i) => <Workout key={i} workout={workout} />)}
            </Flex>
            <Transition
                mounted={true}
                transition="slide-left"
                duration={200}
                timingFunction="ease"
            >
                {(styles) => <Affix style={styles} position={{ bottom: 10, right: 5 }}>
                <ActionIcon onClick={open} color="blue" radius="xl" size={60}>
                    <IoMdAdd size={30} />
                </ActionIcon>
            </Affix>}
            </Transition>
            {/* <Affix position={{ bottom: 10, right: 10 }}>
                <ActionIcon onClick={open} color="blue" radius="xl" size={60}>
                    <IoMdAdd size={30} />
                </ActionIcon>
            </Affix>
            {/* <motion.button
                initial={{ x: -10 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 4.5 }}>
                <ActionIcon onClick={open} color="blue" radius="xl" size={60}>
                    <IoMdAdd size={30} />
                </ActionIcon>
            </motion.button> */}
            <WorkoutOperations opened={opened} onClose={close} workout={null} />
        </>

    )
}

export default Workouts