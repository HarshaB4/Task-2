
import { Schema, model } from 'mongoose';

export interface IFile {
  name: string;
  url: string;
  folder: Schema.Types.ObjectId;
  createdBy?: Schema.Types.ObjectId;
}

const FileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  url: { type: String },
  folder: { type: Schema.Types.ObjectId, ref: 'Folder', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default model<IFile>('File', FileSchema);