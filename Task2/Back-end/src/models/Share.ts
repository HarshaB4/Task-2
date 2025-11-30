import { Schema, model, Types } from 'mongoose';
import crypto from 'crypto';

export interface IShare {
  shareId: string;
  targetType: 'folder' | 'file';
  targetId: Types.ObjectId;
  expiresAt?: Date | null;
  revoked?: boolean;
  createdBy?: Types.ObjectId;
}

const ShareSchema = new Schema<IShare>({
  shareId: { type: String, required: true, unique: true },
  targetType: { type: String, enum: ['folder', 'file'], required: true },
  targetId: { type: Schema.Types.ObjectId, required: true, refPath: 'targetType' },
  expiresAt: { type: Date, default: null },
  revoked: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

ShareSchema.statics.generate = async function(targetType: string, targetId: Types.ObjectId, createdBy?: Types.ObjectId, ttlDays?: number) {
  const shareId = crypto.randomBytes(8).toString('hex');
  const expiresAt = ttlDays ? new Date(Date.now() + ttlDays*24*60*60*1000) : null;
  return this.create({ shareId, targetType, targetId, createdBy, expiresAt });
};

export default model<IShare & { generate?: Function }>('Share', ShareSchema);
