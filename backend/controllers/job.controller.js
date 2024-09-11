import Job from "../models/job.model.js";


//admin post job
export const JobPost = async (req, res) => {
  try {
    const { title, description, requirements, experience, salary, location, jobType, position,qualification, companyId } = req.body;
    const userId = req.id;
    if (!title || !description || !requirements || !experience || !salary || !location || !jobType || !position || !qualification || !companyId) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      })
    }

    const job = await Job({
      title,
      description,
      requirements,
      experienceLevel: experience,
      salary:Number(salary),
      location,
      jobType,
      position,
      qualification,
      company:companyId,
      created_by:userId
    })

    await job.save();

return res.status(200).json({
        message: "Job has been created successfully",
        success: true,
        job
      })

  } catch (error) {
    console.log("Error post job", error)
    return res.status(400).json({
      message: "Failed register compnay name",
      success: false,
    })
  }
}

//get all jobs for student
export const GetAllJobs = async(req, res)=>{
       try {
        const keyword = req.query.keyword || "";
        const query = {
       $or:  [
          {title:{$regex:keyword, $options:"i"}},
          {description:{$regex:keyword, $options:"i"}},
         ]
        }

        const jobs = await Job.find(query).populate({
          path: 'company'
        }).sort({createdAt:-1})
        if(!jobs){
          return res.status(400).json({  
            message: "Job not found",
            success: false,
          })
        }

        return res.status(200).json({
          success:true,
          jobs,
        })
       } catch (error) {
        console.log("Error found job", error)
        return res.status(400).json({
          message: "Job not found",
          success: false,
        })
       }
}

//get job by id for student
export const GetJobById = async(req, res) =>{
     try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId);
      if(!job){
        return res.status(400).json({
          message: "Job not found",
          success: false,
        })
      }
      return res.status(200).json({
        job,
        success: true,
      })
     } catch (error) {
      console.log("Error get job by id", error)
      return res.status(400).json({
        message: "Job not found",
        success: false,
      })
     }
}

//admin job post;

export const GetAdminJob =async (req, res) =>{
  try {
    const adminId = req.id;
    const jobs = await Job.find({created_by:adminId})
     if(!jobs){
      return res.status(400).json({
        message: "Jobs not found",
        success: false,
      })
     }
     return res.status(200).json({
      jobs,
      success: true,
    })
  } catch (error) {
    console.log("Error get job by id=", error)
    return res.status(400).json({
      message: "Job not found",
      success: false,
    })
  }
}

//update admin jobs;
