import { useContext } from 'react';
import { ActionIcon, Badge, Card, Group, Text, Menu, Button, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoPlayOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useWorkoutInterface } from '../hooks/useWorkoutInterface';
import WorkoutOperations from './WorkoutOperations';
import { WorkoutsContext } from '../hooks/workoutContext';

function Workout({ workout, style }) {

    const { deleteWorkout } = useContext(WorkoutsContext);

    const [workoutTotal, secondsAsHumanReadable] = useWorkoutInterface();

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Card style={{ flexBasis: "20em", flexShrink: 0, flexGrow: 0 }} shadow="sm" padding="lg" radius="md" m="lg" withBorder>
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500}>{workout.name}</Text>
                        <Badge color="pink" size='lg'>TOT {secondsAsHumanReadable(workoutTotal(workout))}</Badge>
                    </Group>
                    <Text size="sm" c="dimmed">
                        {workout.note}
                    </Text>
                </Card.Section>
                <Group justify='space-between'>
                    <Text
                        size="lg"
                        fw={900}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    >
                        Prepare
                    </Text>
                    <Text fw={700} >{workout.prepare + 's'}</Text>
                </Group>
                <Group justify='space-between'>
                    <Text
                        size="lg"
                        fw={900}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    >
                        Work
                    </Text>
                    <Text fw={700} c="default">{workout.work + 's'}</Text>
                </Group>
                <Group justify='space-between'>
                    <Text
                        size="lg"
                        fw={900}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    >
                        Rest
                    </Text>
                    <Text fw={700} c="default">{workout.restCycle + 's'}</Text>
                </Group >
                <Group justify='space-between'>
                    <Text
                        size="lg"
                        fw={900}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    >
                        Cycles
                    </Text>
                    <Text fw={700} c="default">{workout.cycles}</Text>
                </Group >
                <Group justify='space-between'>
                    <Text
                        size="lg"
                        fw={900}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    >
                        Sets
                    </Text>
                    <Text fw={700} c="default">{workout.sets}</Text>
                </Group >
                <Group justify='space-between'>
                    <Text
                        size="lg"
                        fw={900}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    >
                        Rest Sets
                    </Text>
                    <Text fw={700} c="default">{workout.restSet + 's'}</Text>
                </Group >
                <Badge mt="5" color="pink" size='lg'>TOT {secondsAsHumanReadable(workoutTotal(workout))}</Badge>
                <Group gap="10" justify='space-between'>
                    <ActionIcon style={{ width: '75%' }} variant="filled" color='green' radius="md" size="xl" aria-label="Settings" mt="md">
                        <IoPlayOutline size={32} />
                    </ActionIcon>
                    <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }} shadow="md" radius={"md"} mt="md" style={{ height: 42 }}>
                        <Menu.Target>
                            <Button>...</Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            {/* <Menu.Label>Application</Menu.Label> */}
                            <Menu.Item onClick={open} leftSection={<MdOutlineEdit style={{ width: rem(14), height: rem(14) }} />}>
                                Edit
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item
                                onClick={() => deleteWorkout(workout.id)}
                                color="red"
                                leftSection={<FaRegTrashAlt style={{ width: rem(14), height: rem(14) }} />}
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Card>
            {/* <WorkoutOperations opened={opened} onClose={close} workout={workout} /> */}
            {
                opened ? <WorkoutOperations opened={opened} onClose={close} workout={workout} /> : null
            }
        </>
    )
}

export default Workout