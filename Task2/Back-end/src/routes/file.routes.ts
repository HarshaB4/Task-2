
import { Router } from 'express';
import * as ctrl from '../controllers/file.controller';
import { authenticate } from '../middleware/auth';
const r = Router();

r.get('/folder/:folderId', ctrl.getFilesInFolder);
r.post('/', authenticate, ctrl.createFile);
r.put('/:id', authenticate, ctrl.renameFile);
r.delete('/:id', authenticate, ctrl.deleteFile);

export default r;
