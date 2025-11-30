import { Router } from 'express';
import * as ctrl from '../controllers/share.controller';
import { authenticate } from '../middleware/auth';
const r = Router();

r.post('/generate', authenticate, ctrl.generateShare);
r.post('/revoke/:shareId', authenticate, ctrl.revokeShare);
r.get('/:shareId', ctrl.getShared);

export default r;