import express from 'express';
import { semesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { departmentRoutes } from '../modules/academicDepartment/department.route';
import { facultyRoutes } from '../modules/Faculty/faculty.routes';
import { studentRoutes } from '../modules/students/student.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { buildingRoutes } from '../modules/building/building.route';
import { roomRoutes } from '../modules/Room/room.route';
import { courseRoutes } from '../modules/Courses/course.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academicSemester',
    routes: semesterRoutes,
  },
  {
    path: '/academic-faculties',
    routes: academicFacultyRoutes,
  },
  {
    path: '/academicDepartment',
    routes: departmentRoutes,
  },
  {
    path: '/faculties',
    routes: facultyRoutes,
  },
  {
    path: '/students',
    routes: studentRoutes,
  },
  {
    path: '/buildings',
    routes: buildingRoutes,
  },
  {
    path: '/rooms',
    routes: roomRoutes,
  },
  {
    path: '/courses',
    routes: courseRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
