import express from 'express';
import { academicDepartmentControllers } from './department.controller';
import { academicDepartmentValidation } from './department.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-department',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(academicDepartmentValidation.createDepartment),
  academicDepartmentControllers.createDepartment
);
router.get(
  '/get-department',
  academicDepartmentControllers.retrieveDepartments
);
router.get('/:id', academicDepartmentControllers.retrieveById);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(academicDepartmentValidation.updateDepartment),
  academicDepartmentControllers.updateDepartmentToDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicDepartmentControllers.deleteDepartmentToDB
);

export const departmentRoutes = router;
