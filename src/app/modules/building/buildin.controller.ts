import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { buildingServices } from './building.services';
import { Building } from '@prisma/client';
import httpStatus from 'http-status';
import { buildingFilterableFields } from './building.constant';
import pick from '../../../shared/pick';

const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingServices.createBuilding(req.body);

  sendResponse<Building>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully created a building',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query);
  const filters = pick(req.query, buildingFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await buildingServices.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBuildingFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await buildingServices.getSingleBuildingFromDB(
      req.params.id
    );

    sendResponse<Building>(res, {
      statusCode: 200,
      success: true,
      message: 'successfully retrieve a building from db',
      data: result,
    });
  }
);
const updateSingleBuildingFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await buildingServices.updateSingleBuildingFromDB(
      id,
      payload
    );

    sendResponse<Building>(res, {
      statusCode: 200,
      success: true,
      message: 'successfully updated a building from db',
      data: result,
    });
  }
);
const deleteSingleBuildingFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await buildingServices.deleteSingleBuildingFromDB(id);

    sendResponse<Building>(res, {
      statusCode: 200,
      success: true,
      message: 'successfully deleted a building from db',
      data: result,
    });
  }
);

export const buildingControllers = {
  createBuilding,
  getAllFromDB,
  getSingleBuildingFromDB,
  updateSingleBuildingFromDB,
  deleteSingleBuildingFromDB,
};
