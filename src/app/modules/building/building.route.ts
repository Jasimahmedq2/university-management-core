import express from 'express';
import { buildingControllers } from './buildin.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingValidations } from './building.validation';

const router = express.Router();
router.get('/', buildingControllers.getAllFromDB);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  buildingControllers.createBuilding
);

router.get('/:id', buildingControllers.getSingleBuildingFromDB);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BuildingValidations.update),
  buildingControllers.updateSingleBuildingFromDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  buildingControllers.deleteSingleBuildingFromDB
);

export const buildingRoutes = router;
