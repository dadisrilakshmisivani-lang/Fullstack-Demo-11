const mongoose=require('mongoose');
let productSchema=new mongoose.Schema({
  title:{type:String,required:true},
  price:{type:Number,required:true},
  description:{type:String,required:true},
  category:{type:String,required:true},
  image:{type:String,required:true},
  rating:
  {
    rate:Number,
    count:Number
  }

});

module.exports=mongoose.model("Product",productSchema);
//the collection in the db is products,even though we pass product