const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    punchInTime: {
      type: Date
    },
    punchOutTime: {
      type: Date
    },
    punchInSelfie: {
      type: String
    },
    punchOutSelfie: {
      type: String
    },
    punchInLocation: {
      latitude: { type: Number },
      longitude: { type: Number }
    },
    punchOutLocation: {
      latitude: { type: Number },
      longitude: { type: Number }
    },
    totalWorkingHours: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Completed', 'Incomplete'],
      default: 'Incomplete'
    },
    overtimeRequested: {
      type: Boolean,
      default: false
    },
    overtimeStatus: {
      type: String,
      enum: ['None', 'Pending', 'Approved', 'Rejected'],
      default: 'None'
    },
    validation: {
      type: String,
      enum: ['Pending', 'Valid', 'Invalid'],
      default: 'Pending'
    },
    remarks: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', attendanceSchema);