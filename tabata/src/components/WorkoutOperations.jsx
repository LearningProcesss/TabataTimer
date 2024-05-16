import React from 'react'
import { Modal, Button, Box, Paper, TextInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

function WorkoutOperations({ opened, onClose, workout }) {

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: workout,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
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
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="workout name"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />

            {/* <Checkbox
              mt="md"
              label="I agree to sell my privacy"
              key={form.key('termsOfService')}
              {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            /> */}

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