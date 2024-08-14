import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the Job schema
const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [{
    type:String,
    required:true
  }],
  salary: {
    type: Number, // Store salary as a number (could be yearly, monthly, etc.)
    required:true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'], // Example job types, customize as needed
    default: 'full-time',
    required:true,
  },
  position: {
    type: String, // The position or job title within the company
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Company",
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assumed that the user model is named 'User')
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application', // Reference to an Application model (if you have a separate model for applications)
    },
  ],
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create and export the Job model
const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
