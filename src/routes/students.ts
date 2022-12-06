import express from 'express';
import controller from '../controllers/students';

const router = express.Router();

router.post('/create/student', controller.createStudent);
router.get('/get/students', controller.getAllStudents);
router.get('/get/students/:id', controller.getStudentByID);

export = router;
