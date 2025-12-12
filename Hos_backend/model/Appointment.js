const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  serviceRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'postponed', 'completed', 'cancelled'], default: 'pending' },
  details: { type: String },
  scheduledAt: { type: Date, required: true },
  completedAt: { type: Date },
  cancelledAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// TTL index: auto-delete completed appointments 30 days after completedAt
appointmentSchema.index({ completedAt: 1 }, { 
  expireAfterSeconds: 30 * 24 * 60 * 60,
  partialFilterExpression: { status: 'completed', completedAt: { $exists: true } }
});

// TTL index: auto-delete cancelled appointments 30 days after cancelledAt
appointmentSchema.index({ cancelledAt: 1 }, { 
  expireAfterSeconds: 30 * 24 * 60 * 60,
  partialFilterExpression: { status: 'cancelled', cancelledAt: { $exists: true } }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
