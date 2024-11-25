import { Router } from 'express';
import { AsyncWrapper } from '@/utils';
import { downloadConvertedFile, getAllConvertedFiles, uploadAndConvertFile } from '../controllers/convertedfile/convertFile';
import multer from 'multer';

const router = Router();

const upload = multer({ dest: 'uploads/' });

router.post('/uploadAndConvertFile', upload.single('file'), AsyncWrapper(uploadAndConvertFile));
router.get('/getAll', AsyncWrapper(getAllConvertedFiles));
router.get('/download/:fileName', AsyncWrapper(downloadConvertedFile));

export default router