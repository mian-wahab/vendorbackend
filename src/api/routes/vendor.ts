import { Router } from 'express';
import { celebrate } from 'celebrate';
import { AsyncWrapper } from '@/utils';
import { Delete } from '../controllers/user';
import { verifyMongooseId } from '@/validators/common';
import { getAllVendor } from '../controllers/vendor/getAllVendor';
import { AddVendor } from '../controllers/vendor/addVendor';
import { UpdateUser } from '../controllers/vendor/updateVendor';
const router = Router();

router.post('/create', AsyncWrapper(AddVendor));
router.get('/getAll', AsyncWrapper(getAllVendor));
router.put('/update/:id', celebrate(verifyMongooseId), AsyncWrapper(UpdateUser));
router.delete('/delete/:id', celebrate(verifyMongooseId), AsyncWrapper(Delete));

export default router