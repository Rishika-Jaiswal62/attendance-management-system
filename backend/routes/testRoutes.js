// const express = require('express');
// const router = express.Router();

// const {protect} = require('../middleware/authMiddleware');
// const {authorizeRoles} = require('../middleware/roleMiddleware');


// router.get('/profile',protect,(req,res)=>{
//     res.json({message: `Hello ${req.user.name}`,role:req.User.role});
// });


// router.get('/admin-only',protect, authorizeRoles('admin'),(req,res) =>{
//     res.json({message:'Welcome Admin!'});
// });

// router.get('/manager-admin-only',protect, authorizeRoles('admin','manager'),(req, res) =>{
//     res.json({message:'Welcome Admin/Manager'});
// });
// module.exports = router;