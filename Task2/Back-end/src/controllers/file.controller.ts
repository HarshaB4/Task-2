import { Request, Response } from 'express';
import File from '../models/File';
import { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';

export async function createFile(req: AuthRequest, res: Response) {
  const { name, url, folder } = req.body;
  if (!mongoose.Types.ObjectId.isValid(folder)) return res.status(400).json({ message: 'Invalid folder id' });
  const file = await File.create({ name, url, folder, createdBy: req.user._id });
  res.json(file);
}

export async function renameFile(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { name } = req.body;
  const file = await File.findByIdAndUpdate(id, { name }, { new: true });
  res.json(file);
}

export async function deleteFile(req: AuthRequest, res: Response) {
  const { id } = req.params;
  await File.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
}

export async function getFilesInFolder(req: Request, res: Response) {
  const folderId = req.params.folderId;
  const files = await File.find({ folder: folderId });
  res.json(files);
}
