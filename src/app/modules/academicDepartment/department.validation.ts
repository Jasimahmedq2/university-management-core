import { z } from 'zod';

const createDepartment = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFacultyId: z.string({
      required_error: 'Academic faculty id is required',
    }),
  }),
});
const updateDepartment = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const academicDepartmentValidation = {
  createDepartment,
  updateDepartment,
};
