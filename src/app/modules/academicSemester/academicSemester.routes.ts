import express from 'express';
import { AcademicControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-semester',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(academicSemesterValidation.crateSemester),
  AcademicControllers.insertToDb
);
router.get('/get-semester', AcademicControllers.retrieveToDB);
router.get('/:id', AcademicControllers.retrieveById);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(academicSemesterValidation.updateSemester),
  AcademicControllers.updateSemesterFromDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicControllers.deleteSemesterFromDB
);

export const semesterRoutes = router;
