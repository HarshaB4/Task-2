
import { Router } from 'express';
import * as ctrl from '../controllers/floder.controller';
import { authenticate } from '../middleware/auth';
const r = Router();

r.get('/', ctrl.getRootFolders);
r.get('/:id', ctrl.getFolderById); // nested view: files & children
r.get('/children/:parentId', ctrl.getSubFolders);

// Admin actions
r.post('/', authenticate, ctrl.createFolder);
r.put('/:id', authenticate, ctrl.renameFolder);
r.delete('/:id', authenticate, ctrl.deleteFolder);

export default r;