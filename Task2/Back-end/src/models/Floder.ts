import { Schema, model, Types } from 'mongoose';

export interface IFolder {
  name: string;
  parent?: Types.ObjectId | null;
  createdBy?: Types.ObjectId;
  isDeleted?: boolean;
}

const FolderSchema = new Schema<IFolder>({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default model<IFolder>('Folder', FolderSchema);
