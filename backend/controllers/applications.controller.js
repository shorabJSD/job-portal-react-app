import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const ApplyJob = async (req, res) => {
    try {
      const userId = req.id; // Ensure `req.id` is set correctly. If `req.id` is undefined, it will cause issues.
      const jobId = req.params.id; // Correct way to get the job ID from the request parameters.
  
      if (!jobId) {
        return res.status(400).json({
          message: "Oops, Job id is required",
          success: false,
        });
      }
  
      // Check whether the user has already applied for the job.
      const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
      if (existingApplication) {
        return res.status(400).json({
          message: "You have already applied for this job",
          success: false,
        });
      }
  
      // Check whether the job exists or not.
      const job = await Job.findById(jobId); // Correctly checks for job existence.
      if (!job) {
        return res.status(400).json({
          message: "Job not found",
          success: false,
        });
      }
  
      // Create a new application.
      const newApplication = new Application({
        job: jobId,
        applicant: userId, 
      });
  
      // Push the new application to the job's applications array.
      job.applications.push(newApplication);
  
      // Save the new application.
      await newApplication.save(); // Saves the new application to the database.
  
      // Respond with success message.
      return res.status(200).json({
        message: "Job has been applied successfully",
        success: true,
      });
  
    } catch (error) {
      console.log("Failed to apply current job", error);
      return res.status(400).json({
        message: "Application failed, please try later",
        success: false,
      });
    }
  };
  

//get applied job
export const GetAppliedJob = async (req, res) =>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({created:-1}).populate({
            path:"job",
            options:{sort:{created:-1}},
            populate:{
                path:"company",
                options:{sort:{created:-1}}
            }
        })
    if(!application){
        return res.status(400).json({
            message:"Application not found",
            success:false
        })
    }

    return res.status(200).json({
        success:true,
        application
    })
    } catch (error) {
        console.log("Failed getting jobs", error)
        return res.status(400).json({
          message: "application not founded, please later",
          success: false,
        })
    }
}

//admin check number of applicant who has applied to the job.
 export const getApplicants = async (req, res) =>{
    try {
        const jobId= req.params.id;
        const job = await Application.findById(jobId).populate({
            path:'applications',
            options:{sorte:{created:-1}},
            populate:{
                path:"applicant"
            }
        })
        if(!job){
            return res.status(400).json({
                message:"Not found applicants",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
        console.log("Error: ", error)
        return res.status(400).json({
            message:"Something went wrong",
            success:false
        })
    }
 }


 //update application
export const UpdateApplicatioin = async (req, res) =>{
    try {
       const {status} = req.body;
       const applicationId = req.params.id;
       if(!status){
        return res.status(400).json({
            message:"Status is required",
            success:false
        })
       }

       //find the application by applicantion id;
       const application = await Application.findOne({_id:applicationId})
       if(!application){
          return res.status(400).json({
            message:"Application not found",
            success:true
          })
       }

    application.status = status.toLowerCase();
    await application.save()
    return res.status(200).json({
        success:true,
        message:"Status updated successfully"
    })

    } catch (error) {
        console.log("Error: ", error)
        return res.status(400).json({
            message:"Something went wrong",
            success:false
        })
    }
 }