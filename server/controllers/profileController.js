import Employee from "../models/Employee.js";


//GET profile 
//GET /api/profile
export const getProfile = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({userId: session.userId})

        if(!employee){
            //If employee not found - Means he is an Admin, return admin profile
            return res.json({
                firstName: "Admin",
                lastName: "",
                email: session.email,
            })
        }

        return res.json(employee);

    } catch (error) {
        return res.status(500).json({error: "Failed to fetch profile"});
    }
}

//Update profile
//PUT /api/profile/
export const updateProfile = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({userId: session.userId});

        if(!employee){
            return res.status(404).json({error: "Employee Not Found"});
        }
        
        if(employee.isDeleted){
            return res.status(403).json({error: "Your account is deactivated. You cant update the profile"});
        }
        
        await Employee.findByIdAndUpdate(employee._id, {
            bio: req.body.bio
        })

        return res.json({success: true, message: "Profile Updated Successfully !"})

    } catch (error) {
        return res.status(500).json({error: "Failed To Update Profile"});
    }
}