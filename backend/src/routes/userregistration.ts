import express from 'express'
const router=express.Router()
router.use(express.json())
import bcrypt from 'bcrypt'
import User from '../db/userschema'
export interface Userdetails{
    name:string,
    email:string,
    password:string
}

router.post('/register',async function(req:any,res:any)
{    

      try 
      {
                const body:Userdetails=req.body;
      if (!body.email||!body.password||!body.name)
      {
         console.log("got irrevelent details")
           return res.status(400).json(
            {
                message:"Give valid data for registration"
            }
           )
      }
     
      const userfound=await User.findOne(
        {
            email:body.email
        }
      )

      if (userfound)
      {
           return res.status(400).json(
            {
                message:"Email already exist/user already exist please login"
            }
           )
      }

      const hashedpassword=await bcrypt.hash(body.password,10)

      const usercreated=await User.create(
        {
               name:body.name,
               email:body.email,
               password:hashedpassword
        }
      )

       await usercreated.save();

       return res.status(201).json(
        {
            message:"user created sucessfully",
            userdetail:{
                id:usercreated._id,
                name:usercreated.name,
                email:usercreated.email
            }
        }
       )

      }

      catch (e)
      {
           console.error(e)
           return res.status(400).json(
            {
                message:e
            }
           )
      }
     

})

export default router