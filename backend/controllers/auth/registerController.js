const User  = require('../../models/User');
const generateToken = require('../../utils/generateToken');

const registerUser = async (req,res) =>{
    try {
        const {name,email,password, role}= req.body;
        if(!name || !email || !password ) {
            return res.status(400).json({message: "All fill all fields" })
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'employee'
        });

        return res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token: generateToken(user._id,user.role)
        });
    } catch (error){
        return res.status(500).json({message:'Server error', error:error.message})
    }
};

module.exports = registerUser;

