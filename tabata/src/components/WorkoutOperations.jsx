import { useContext } from 'react';
import { Modal, Button, Paper, TextInput, NumberInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { WorkoutsContext } from '../main';
import { zodResolver } from 'mantine-form-zod-resolver';
import { WorkoutValidator } from '../api/Validator';

function WorkoutOperations({ opened, onClose, workout }) {

  const { handleWorkoutsChangeHandler, createNextWorkoutId } = useContext(WorkoutsContext);

  const nextId = createNextWorkoutId();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: workout === null ?
      {
        id: nextId,
        name: '',
        note: '',
        prepare: 0,
        work: 0,
        restCycle: 0,
        cycles: 1,
        sets: 1,
        restSet: 0
      }
      :
      {
        id: workout.id,
        name: workout.name,
        note: workout.note,
        prepare: workout.prepare,
        work: workout.work,
        restCycle: workout.restCycle,
        cycles: workout.cycles,
        sets: workout.sets,
        restSet: workout.restSet
      },
    validate: zodResolver(WorkoutValidator)
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Workout"
        centered>
        <Paper shadow="sm" p="xl">
          <form onSubmit={form.onSubmit((values, event) => {
            console.log(values, event, WorkoutValidator.parse(values))
            handleWorkoutsChangeHandler(WorkoutValidator.parse(values));
            form.reset();
            onClose();
          }, (validationErrors, values) => {
            console.log(validationErrors);
            console.log(values);

          })}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="workout name"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Note"
              placeholder="your notes"
              key={form.key('note')}
              {...form.getInputProps('note')}
            />
            <NumberInput
              label="Prepare"
              placeholder="how much time do you need to be ready?"
              key={form.key('prepare')}
              min={0}
              {...form.getInputProps('prepare')}
            />
            <NumberInput
              label="Work"
              placeholder="how much time do you need to be ready?"
              key={form.key('work')}
              min={0}
              {...form.getInputProps('work')}
            />
            <NumberInput
              label="Rest"
              placeholder="how much time do you need to be ready?"
              key={form.key('restCycle')}
              min={0}
              {...form.getInputProps('restCycle')}
            />
            <NumberInput
              label="Cycles"
              placeholder="how much time do you need to be ready?"
              key={form.key('cycles')}
              min={1}
              {...form.getInputProps('cycles')}
            />
            <NumberInput
              label="Sets"
              placeholder="how much time do you need to be ready?"
              key={form.key('sets')}
              min={1}
              {...form.getInputProps('sets')}
            />
            <NumberInput
              label="Rest Set"
              placeholder="how much time do you need to be ready?"
              key={form.key('restSet')}
              min={0}
              {...form.getInputProps('restSet')}
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