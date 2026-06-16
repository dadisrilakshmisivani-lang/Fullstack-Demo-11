require('dotenv').config();
const express=require('express');
const jwt=require('jsonwebtoken')
//const users=require('./models/usermodel')
const app=express();
//const mail = require('./utils/gmail');
//const products=require('./models/productmodel')
const connection=require('./config/db');
//const bcrypt=require('bcrypt')
const cors=require('cors');
const limiter =require('./middleware/ratelimit');
const port=3000;

//let secretkey='sivanisecretkey'//globally setting the secret key
const productroutes=require('./routes/productroutes')
const authroutes=require('./routes/authroutes')
//middlewares
app.use(cors())//first cors should be done
app.use(limiter)
app.use(express.json())

//to parse the req, and response 

app.use('/products',productroutes)
app.use('/auth',authroutes)
/*app.get('/products',async(req,res)=>
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

});
app.post('/products',async(req,res)=>
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
});
app.post('/bulkproducts',async(req,res)=>
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
});
app.put('/products/:id',async (req,res)=> //route parametres
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

});
app.delete('/products/:id',async (req,res)=>
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

});

app.post('/register', async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // check missing fields
    if (!username || !password || !email || !role) {
      return res.json({
        msg: "Missing fields"
      });
    }

    // check if username exists
    let checkuser = await users.findOne({ username });

    if (checkuser) {
      return res.json({
        msg: "Username already exists"
      });
    }

    // hash password
    let hashpassword = await bcrypt.hash(password, 10);

    // create user and store in variable
    let newUser = await users.create({
      username,
      password: hashpassword,
      email,
      role
    });

    // generate token
    let token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role
      },
      secretkey,
      {
        expiresIn: "1h"
      }
    );

    // send response
    res.json({
      msg: "Registration successful",
      token:token
    });

    // send mail
    mail(email, username);

  } catch (error) {
    res.json({
      msg: error.message
     
    });
  }
});


app.post('/login', async (req, res, next) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({
        msg: "Missing fields"
      });
    }

    // check user
    let checkuser =
      await users.findOne({ username });

    if (!checkuser) {
      return res.json({
        msg: "User not found"
      });
    }

    // check password
    let checkpassword =
      await bcrypt.compare(
        password,
        checkuser.password
      );

    if (!checkpassword) {
      return res.status(403).json({
        msg: "Password or username mismatched"
      });
    }

    // get token from Authorization header
    let authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        msg: "Authorization token missing"
      });
    }

    let token =
      authHeader.split(" ")[1];

    // verify token
    let checktoken =
      jwt.verify(token, secretkey);

    if (!checktoken) {
      return res.json({
        msg: "Invalid token"
      });
    }

    return res.json({
      msg: "Login successful",
       token: token
    });

  } catch (error) {
    next(error);
  }
});
*/

app.listen(port,()=>{
    console.log(`Server is started at ${port}`)
    connection();
    
});



