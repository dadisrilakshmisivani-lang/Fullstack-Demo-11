const mongoose=require('mongoose');
//connecting is a synchronous
let connection=async()=>
{
    try 
    {
      await  mongoose.connect(process.env.MONGO_URL);
      console.log("connection is successful")
    } 
    catch (error) 
    {
        console.log(error.message)
    }
}
module.exports=connection
