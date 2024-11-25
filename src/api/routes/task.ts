import { Router } from 'express';
import { celebrate } from 'celebrate';
import { AsyncWrapper } from '@/utils';
import { AddTask, Delete, GetAll, GetAllPaginatedTasks, GetById, GetFilteredTasks, UpdateTask } from '../controllers/task';
import { verifyMongooseId } from '@/validators/common';
import { TaskInput, UpdateTaskValidation } from '@/validators/task';

const router = Router();

router.post('/create', celebrate(TaskInput), AsyncWrapper(AddTask));
router.get('/getAll', AsyncWrapper(GetAll));
router.get('/getFilteredTasks', AsyncWrapper(GetFilteredTasks));
router.get('/getAllPaginatedTasks', AsyncWrapper(GetAllPaginatedTasks));
router.get('/getTaskById/:id', celebrate(verifyMongooseId), AsyncWrapper(GetById));
router.put('/update/:id', celebrate(verifyMongooseId), celebrate(UpdateTaskValidation), AsyncWrapper(UpdateTask));
router.delete('/delete/:id', celebrate(verifyMongooseId), AsyncWrapper(Delete));

export default router;