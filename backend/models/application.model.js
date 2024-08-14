import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the Application schema
const applicationSchema = new Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // Reference to the Job model
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming the user is the applicant)
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interview', 'offered', 'rejected'], // Example statuses
    default: 'pending',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create and export the Application model
const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
