import { Affix, Flex, Transition, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { IoMdAdd } from "react-icons/io";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoCloudDownload } from "react-icons/io5";
import { IoCloudUpload } from "react-icons/io5";
import { WorkoutsContext } from '../hooks/workoutContext';
import Workout from './Workout';
import WorkoutModal from './WorkoutModal';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

function Workouts() {

    const { workouts, downloadConfiguration, uploadConfiguration } = useContext(WorkoutsContext);

    const [opened, { open, close }] = useDisclosure(false);

    const { innerWidth: width, innerHeight: height } = window;

    return (
        <>
            <ScrollArea h={height - 25} type="never" offsetScrollbars scrollbarSize={2} scrollHideDelay={0}>
                <Flex justify="space-between"
                    align={"center"}
                    wrap={"wrap"}
                >
                    {workouts?.map((workout, i) => <Workout key={i} workout={workout} />)}
                </Flex>
            </ScrollArea>
            <Transition
                mounted={true}
                transition="slide-left"
                duration={200}
                timingFunction="ease"
            >
                {(styles) => <Affix style={styles} position={{ bottom: 1, right: 1 }}>
                    <Fab
                        icon={<IoMdAdd size={30} />}
                        alwaysShowTitle={true}
                        mainButtonStyles={{  }}
                    >
                        <Action
                            //   text="New"
                            onClick={open}
                        >
                            <MdOutlineAddCircleOutline size={30} />
                        </Action>
                        <Action
                            // text="Export configuration"
                            onClick={downloadConfiguration}
                        >
                            <i className="fa fa-help" />
                            <IoCloudDownload size={30} />
                        </Action>
                        <Action
                            // text="Export configuration"
                            onClick={uploadConfiguration}
                        >
                            <i className="fa fa-help" />
                            <IoCloudUpload size={30} />
                        </Action>
                    </Fab>
                </Affix>}
            </Transition>
            {
                opened ? <WorkoutModal opened={opened} onClose={close} workout={null} /> : null
            }
        </>

    )
}

export default Workouts