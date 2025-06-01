import express from 'express'
import bcrypt from 'bcrypt'
import User from '../db/userschema'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const router=express.Router()
router.use(express.json())
export interface Userdetails{
    name:string,
    email:string,
    password:string
}

router.post('/login',async function(req:any,res:any)
{    
    try 
    {
     const body:Userdetails=req.body;

     if (!body.email||!body.password)
     {
          return res.status(400).json(
            {
                message:"Please prove all the field data"
            }
          )
     }


   const user=await User.findOne(
    {
        email:body.email
    }
   )

   if (!user)
   {
        console.log('no user found with this email id re baba');

        return res.status(400).json(
            {
                message:'you need to register before logging in baba'
            }
        )

   }

   const hashedpassword=await bcrypt.compare(body.password,user.password)

      if (!hashedpassword)
      {

            return res.status(401).json(
                
                {
                    message:"Password was incorrect baba please give correct password"
                }
            )
      }
     
      const payload={
        email:body.email,
        id: user._id,

      }
      const secret=process.env.JWTSECRET
      console.log(`the env is ${process.env.JWTSECRET}`)
      if(!secret)
      {  console.log("I did not found jwt token in enf file bro")
         return  res.status(500).json({ message: "Server error: JWT secret missing" });
      }
     
      const token=await jwt.sign(payload,secret)

      return res.status(201).json(
        {
            message:"Login successful",
            jwt:token
        }
      )


    }

    catch(e)
    {
       console.error(e);
       return res.status(400).json(
        {
            message:e
        }
       )
    }
    
})


export default router