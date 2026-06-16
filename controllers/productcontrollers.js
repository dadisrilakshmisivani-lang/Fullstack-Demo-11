let products=require('../models/productmodel')
exports.getproduct=async(req,res)=>
{
    try 
    {
    let allproducts=await products.find();
    res.status(200).json(allproducts);   
    } 
    catch (error) 
    {
       res.json({msg:error.message})
    }
}
exports.createproduct=async(req,res)=>
{
    try 
    {
      await products.create(req.body);//the req body consitss of product details
      res.status(201).json({msg:"product is saved"});    
    } 
    catch (error) 
    {
       res.json({msg:error.message})
    }
}
exports.createbulkproducts=async(req,res)=>
{
    try 
    {
     await products.insertMany(req.body);
      res.status(201).json({msg:"products are  saved"});   
    } 
    catch (error) 
    {
       res.json({msg:error.message})
    }
}

exports.findproducts=async (req,res)=> //route parametres
{
    try 
    {
        let pid=req.params.id;
        await products.findByIdAndUpdate(pid,req.body);
         // id where updation takse place then the object to update
         res.status(200).json({msg:"products are  updated"})

        
    } 
    catch (error) 
    {
       res.json({msg:error.message})
    }

}

exports.deleteproducts=async (req,res)=>
{
    try 
    {
         let pid=req.params.id;
        await products.findByIdAndDelete(pid); 
        res.status(200).json({msg:"products are  deleted"})   
    } 
    catch (error) 
    {
       res.json({msg:error.message})
    }

}