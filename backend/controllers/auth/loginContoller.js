const User = require('../../models/User');
const generateToken = require('../../utils/generateToken');


const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:'please provide email and password'});
        }
        const user = await User.findOne({email});
        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({message:'Invaid email or password'});
        }
        return res.status(200).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id,user.role)
        });
    }catch(error){
        return res.status(500).json({message:'Server error',error:error.message});
    }
};

module.exports = loginUser;
