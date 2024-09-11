import Company from "../models/company.model.js";

 export const  RegisterCompany = async (req, res) =>{
      try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            })
        }

        let company = await Company.find({name:companyName});
        if(company){
            return res.status(400).json({
                message: "Compnay name already registered",
                success: false,
            })
        }

         company = new Company({
            name:companyName,
            userId:req.id
         })

         await company.save();

         return res.status(200).json({
             company,
            message: "Company Register successfully",
            success: true,
        })

      } catch (error) {
        console.log("Error While register company name" , error);
        return res.status(400).json({
            message: "Failed register compnay name",
            success: false,
        })
      }
}


//https://github.com/shorabJSD?tab=repositories
//get company by user id. Who has created this company; . it might be more than one compnay;
export const GetCompany = async(req, res)=>{
try {
    const userId = req.id;
    const companies =  await Company.find({userId});
    if(!companies){
        return res.status(400).json({
            message: "Oops, Company not found.",
            success: false,
        })
    }

    return res.status(200).json({
        success:true,
        companies
    })
} catch (error) {
    console.log("Error ocurring,  fetching company data" , error);
    return res.status(400).json({
        message: "Failed, fetching comapny data",
        success: false,
    })
}
}


//user can access the params id of companies; 
export const GetCompanyById = async (req, res) =>{
    try {
      const companyId = req.params.id;
      const company = await Company.findById(companyId);
      if(!company){
        return res.status(400).json({
            message: "Failed to fetching data",
            success: false,
        })
      }
 
      return res.status(200).json({
        success: true,
        company
    })

    } catch (error) {
        return res.status(400).json({
            message: "Failed, fetching comapny data",
            success: false,
        })
    }
}


//company credentials updates;;
export const UpdateCompany = async (req, res)=>{
     try {
        const {name, description, website, location} = req.body;
        const file = req.file;
        // here will come again to setup  cloudinary for uploading company logo 
        const updateData = {name, description, website, location};
        
        const existingCompany = await Company.findOne({name:name});

        if(existingCompany && existingCompany._id.toString() === req.params.id){
            return res.status(400).json({
                message: "Oops! A company with that name already exists",
                success: false,
            })
        }
        
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});
        if(!company){
            return res.status(400).json({
                message: "Oops ! Company not found",
                success: false,
            })
        }

 
        return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            company,
        });


     } catch (error) {
        console.log("Error update",error)
        return res.status(400).json({
            message: "Oops ! Update failed",
            success: false,
        })
     }
}


 




