const express=require('express');
let router=express.Router();
const {register,login}=require('../controllers/authcontrollers')
router.post('/register',register)
router.post('/login',login)
module.exports=router