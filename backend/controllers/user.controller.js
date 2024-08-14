import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


export const NewUserRegistration = async (req, res) => {
    try {
        const { fullname, phoneNumber, email, password, role } = req.body;
        if (!fullname || !phoneNumber || !email || !password || !role) {
            return res.status(402).json({
                message: "Something missing",
                success: false
            })
        }

        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                message: "User already exist along with this credential",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            fullname,
            phoneNumber,
            email,
            password: hashedPassword,
            role
        })

        await newUser.save();
        return res.status(200).json({
            message: "User Registration has been successful",
            success: true
        })

    } catch (error) {
        console.log("Error occuring while user tried to register", error);
        return res.status(400).json({
            message: "Registration failed! Please try again",
            success: false,
        })
    }
}

//login 
export const UserLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(402).json({
                message: "Something is missing",
                success: false
            })
        }
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "Oops! Incorrect email",
                success: false
            })
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({
                message: "Oops! Incorrect password",
                success: false
            })
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Oops! Doesn't  exist current role",
                success: false
            })
        }

        //token generate;
        const tokenId = {
            userId: user._id
        };

        const token = await jwt.sign(tokenId, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            phoneNumber: user.phoneNumber,
            email: user.email,
            password: user.password,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Logged in successfull, welcome back ${user.fullname}`,
            user,
            success: true,
        })
    } catch (error) {
        console.log("Error occuring while Login", error);
        return res.status(400).json({
            message: "Oops! Login failed",
            success: false,
        })
    }
}


//user logout;
export const Logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', { maxAge: 0 }).json({
            message: "Logged out successful",
            success: true,
        })
    } catch (error) {
        console.log("Logout Error", error);
        return res.status(400).json({
            message: "Oops!Logout failed",
            success: false,
        })
    }
}


//update profile
export const UpdateProfile = async (req, res) => {
    try {
        const { fullname, phoneNumber, email, bio, skills } = req.body;
        const file = req.file;
        if (!fullname || !phoneNumber || !email || !bio || !skills) {
            return res.status(402).json({
                message: "Something missing",
                success: false
            })
        }

        //cloudynary would here

        const isSkillArray = skills.split(",");
        const userId = req.id;
        let user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                message: "Oops!User not found",
                success: false,
            })
        }

        //updating user;
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.bio = bio;
        user.profile.skills = isSkillArray;
        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            bio: user.bio,
            profile: user.profile
        }
        console.log(user)
        return res.status(200).json({
            user,
            message: "Profile has been updated successfully",
            success: true,
        });

    } catch (error) {
        console.log("Update has been Error", error);
        return res.status(400).json({
            message: "Oops!User updated failed",
            success: false,
        })
    }
}
