import { Schema, model, Document } from 'mongoose';

export const REPORT_TYPES = [
  'INTRUSION_DETECTED',
  'VLAN_CREATED',
  'VLAN_DELETED',
  'DEVICE_QUARANTINED',
  'POLICY_CHANGED',
  'NETWORK_MODIFIED',
  'SYSTEM_ALERT'
] as const;

export const REPORT_SEVERITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
export const REPORT_STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED'] as const;

export type ReportType = (typeof REPORT_TYPES)[number];
export type ReportSeverity = (typeof REPORT_SEVERITIES)[number];
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export interface IReport extends Document {
  title: string;
  description: string;
  type: ReportType;
  severity: ReportSeverity;
  vlanId?: number;
  deviceIp?: string;
  deviceMac?: string;
  attackerIp?: string;
  actionTaken?: string;
  status: ReportStatus;
  createdBy: string;
  evidence?: string[];
  logs?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    type: { type: String, required: true, enum: REPORT_TYPES },
    severity: { type: String, required: true, enum: REPORT_SEVERITIES },
    vlanId: { type: Number, min: 1, max: 4094 },
    deviceIp: { type: String, trim: true },
    deviceMac: { type: String, trim: true },
    attackerIp: { type: String, trim: true },
    actionTaken: { type: String, trim: true, maxlength: 2000 },
    status: { type: String, required: true, enum: REPORT_STATUSES, default: 'OPEN' },
    createdBy: { type: String, required: true, trim: true },
    evidence: { type: [String], default: [] },
    logs: { type: [String], default: [] }
  },
  { timestamps: true }
);

reportSchema.index({ type: 1, severity: 1, status: 1 });
reportSchema.index({ createdAt: -1 });
reportSchema.index({ vlanId: 1 });
reportSchema.index({ deviceIp: 1 });

export const ReportModel = model<IReport>('Report', reportSchema);
