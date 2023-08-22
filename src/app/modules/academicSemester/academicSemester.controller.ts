import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemester } from '@prisma/client';
import { AcademicSemesterServices } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';

const insertToDb = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterServices.insertToDb(req.body);

  sendResponse<AcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully created a semester',
    data: result,
  });
});
const retrieveToDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'skip', 'page']);
  const filter = pick(req.query, ['year', 'code', 'title']);
  console.log({ options, filter });
  const result = await AcademicSemesterServices.retrieveToDB(options, filter);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully get all semester',
    data: result.data,
    meta: result.meta,
  });
});

const retrieveById = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterServices.retrieveById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully retrieve a semester',
    data: result,
  });
});
const updateSemesterFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AcademicSemesterServices.updateSemesterFromDB(
    id,
    payload
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully update a semester',
    data: result,
  });
});
const deleteSemesterFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.deleteSemesterFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully deleted a semester',
    data: result,
  });
});

export const AcademicControllers = {
  insertToDb,
  retrieveToDB,
  retrieveById,
  updateSemesterFromDB,
  deleteSemesterFromDB,
};
