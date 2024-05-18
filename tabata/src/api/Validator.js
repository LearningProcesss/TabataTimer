import { z } from 'zod';

export const WorkoutValidator = z.object({
    id: z.string(),
    name: z.string({
        required_error: 'required',
      })
      .min(1, { message: 'not empty' }),
    note: z.string({
        required_error: "required field",
        invalid_type_error: " is required",
      }),
    prepare: z.number({
        required_error: "required field",
        invalid_type_error: " is required",
      }).min(0),
    work: z.number({
        required_error: "required field",
        invalid_type_error: " is required",
      }).min(0),
    restCycle: z.number({
        required_error: "required field",
        invalid_type_error: " is required",
      }).min(0),
    cycles: z.number({
        required_error: "required field",
        invalid_type_error: " is required",
      }).min(1),
    sets: z.number({
        required_error: "required field",
        invalid_type_error: " is required",
      }).min(1),
    restSet: z.number({
        required_error: "required field",
        invalid_type_error: " is required",
      }).min(0),
});

export const WorkoutsValidator = z.array(WorkoutValidator);