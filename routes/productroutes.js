const express=require('express');
let router=express.Router();
const {getproduct,createproduct,createbulkproducts,findproducts,deleteproducts} =require('../controllers/productcontrollers')
router.get('/',getproduct)
router.post('/',createproduct)
router.post('/bulk',createbulkproducts)
router.put('/:id',findproducts)
router.delete('/:id',deleteproducts)
module.exports=router