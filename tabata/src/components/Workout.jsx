import React from 'react'
import { IoPlayOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { Card, Image, Text, Badge, Button, Group, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import WorkoutOperations from './WorkoutOperations';
import { useWorkoutInterface } from '../hooks/useWorkoutInterface';

function Workout({ workout, style }) {

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
                    <ActionIcon style={{ width: '80%' }} variant="filled" color='green' radius="md" size="xl" aria-label="Settings" mt="md">
                        <IoPlayOutline size={32} />
                    </ActionIcon>
                    <ActionIcon
                        variant="gradient"
                        size="xl"
                        aria-label="Gradient action icon"
                        gradient={{ from: 'blue', to: 'green', deg: 90 }}
                        mt="md"
                        radius="md"
                        onClick={open}
                    >
                        <MdOutlineEdit />
                    </ActionIcon>
                </Group>
            </Card>
            <WorkoutOperations opened={opened} onClose={close} workout={workout} />
        </>
    )
}

export default Workout