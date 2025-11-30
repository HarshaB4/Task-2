import { Request, Response } from 'express';
import Share from '../models/Share';
import Folder from '../models/Floder';
import File from '../models/File';
import { AuthRequest } from '../middleware/auth';

export async function generateShare(req: AuthRequest, res: Response) {
  const { targetId, targetType, ttlDays } = req.body;
  if (!['folder', 'file'].includes(targetType)) return res.status(400).json({ message: 'Invalid targetType' });
  const itemExists = targetType === 'folder' ? await Folder.exists({ _id: targetId }) : await File.exists({ _id: targetId });
  if (!itemExists) return res.status(404).json({ message: 'Target not found' });
  const share = await (Share as any).generate(targetType, targetId, req.user._id, ttlDays);
  res.json({ shareId: share.shareId, share });
}

export async function revokeShare(req: AuthRequest, res: Response) {
  const { shareId } = req.params;
  const share = await Share.findOneAndUpdate({ shareId }, { revoked: true }, { new: true });
  res.json(share);
}

export async function getShared(req: Request, res: Response) {
  const { shareId } = req.params;
  const share = await Share.findOne({ shareId, revoked: false });
  if (!share) return res.status(404).json({ message: 'Not found or revoked' });
  if (share.expiresAt && share.expiresAt < new Date()) return res.status(410).json({ message: 'Expired' });

  if (share.targetType === 'file') {
    const file = await File.findById(share.targetId);
    return res.json({ type: 'file', file });
  } else {
    const folder = await Folder.findById(share.targetId);
    const files = await File.find({ folder: share.targetId });
    const children = await Folder.find({ parent: share.targetId, isDeleted: false });
    return res.json({ type: 'folder', folder, files, children });
  }
}