import React, { useContext } from 'react'
import { Modal, Button, Box, Paper, TextInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { WorkoutsContext } from '../main';

function WorkoutOperations({ opened, onClose, workout }) {
  
  const context = useContext(WorkoutsContext);
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: workout.name,
      note: workout.note
    },

  });

  return (
    <>
      <Modal 
        opened={opened}
        onClose={onClose}
        title="Workout"
        centered>
        <Paper shadow="sm" p="xl">
          <form onSubmit={form.onSubmit((values, event) => 
            {
              console.log(values, event)
              context.handleWorkoutsChangeHandler(
                {
                  id: workout.id,
                  name: values.name,
                  note: values.note
                })
            })}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="workout name"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label="Note"
              placeholder="your notes"
              key={form.key('note')}
              {...form.getInputProps('note')}
            />
            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Paper>
      </Modal>
    </>
  );
}

export default WorkoutOperations