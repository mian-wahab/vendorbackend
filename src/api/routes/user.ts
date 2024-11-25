import { Router } from 'express';
import { celebrate } from 'celebrate';
import { AsyncWrapper } from '@/utils';
import { AddUser , UpdateUser , GetAllUser , Delete} from '../controllers/user';
import { AddNewUser, UserInput } from '@/validators';
import { verifyMongooseId } from '@/validators/common';
const router = Router();

router.post('/create', celebrate(AddNewUser), AsyncWrapper(AddUser));
router.get('/getAll', AsyncWrapper(GetAllUser));
router.put('/update/:id',  celebrate(verifyMongooseId),celebrate(AddNewUser),AsyncWrapper(UpdateUser));
router.delete('/delete/:id', celebrate(verifyMongooseId), AsyncWrapper(Delete));

export default router