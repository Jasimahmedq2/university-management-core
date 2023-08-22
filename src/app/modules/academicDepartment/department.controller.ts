import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { academicDepartmentServices } from './department.service';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartment } from '@prisma/client';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './department.constant';
import httpStatus from 'http-status';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await academicDepartmentServices.createDepartment(req.body);

  sendResponse<AcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully created a department',
    data: result,
  });
});
const retrieveDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await academicDepartmentServices.retrieveDepartments(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicDepartments fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const retrieveById = catchAsync(async (req: Request, res: Response) => {
  const result = await academicDepartmentServices.retrieveById(req.params.id);

  sendResponse<AcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully retrieve a department',
    data: result,
  });
});
const updateDepartmentToDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await academicDepartmentServices.updateDepartmentToDB(
    id,
    payload
  );

  sendResponse<AcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully updated a department',
    data: result,
  });
});
const deleteDepartmentToDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await academicDepartmentServices.deleteDepartmentToDB(id);

  sendResponse<AcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully deleted a department',
    data: result,
  });
});

export const academicDepartmentControllers = {
  createDepartment,
  retrieveDepartments,
  retrieveById,
  updateDepartmentToDB,
  deleteDepartmentToDB,
};
