import { Request, Response } from 'express';
import Folder from '../models/Floder';
import File from '../models/File';
import { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';

export async function createFolder(req: AuthRequest, res: Response) {
  const { name, parent } = req.body;
  const createdBy = req.user._id || req.user.id;
  const folder = await Folder.create({ name, parent: parent || null, createdBy });
  res.json(folder);
}

export async function getRootFolders(req: Request, res: Response) {
  const roots = await Folder.find({ parent: null, isDeleted: false }).sort({ createdAt: -1 });
  res.json(roots);
}

export async function getSubFolders(req: Request, res: Response) {
  const parentId = req.params.parentId;
  if (!mongoose.Types.ObjectId.isValid(parentId)) return res.status(400).json({ message: 'Invalid parentId' });
  const children = await Folder.find({ parent: parentId, isDeleted: false });
  res.json(children);
}

export async function getFolderById(req: Request, res: Response) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
  const folder = await Folder.findById(id);
  if (!folder) return res.status(404).json({ message: 'Not found' });
  const files = await File.find({ folder: id });
  const children = await Folder.find({ parent: id, isDeleted: false });
  res.json({ folder, files, children });
}

export async function renameFolder(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { name } = req.body;
  const folder = await Folder.findByIdAndUpdate(id, { name }, { new: true });
  res.json(folder);
}

export async function deleteFolder(req: AuthRequest, res: Response) {
  const { id } = req.params;
  // soft-delete folder and descendant folders & files (basic)
  await Folder.findByIdAndUpdate(id, { isDeleted: true });
  await Folder.updateMany({ parent: id }, { isDeleted: true });
  // optionally delete files
  await File.deleteMany({ folder: id });
  res.json({ message: 'Deleted' });
}

