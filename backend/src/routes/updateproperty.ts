import express from 'express'
import authmiddleware from '../middleware/authmiddleware'
import Property from '../db/schema'

const router=express.Router()


router.put('/property/:id',authmiddleware,async function (req:any,res:any)
{
      try 
      {
           const propertyid=req.params.id;
           const updates=req.body;

           if (!propertyid)
           {
              console.log("no property id is sent in params");
               return res.status(400).json(
                {
                    message:"No Property has been sent. pLese send the properyid next time for updates"
                }
               )
           }

           const property=await Property.findById(propertyid);

           if (!property)
           {
             console.log("NO propert found in datbase with this particualar id baba")

             return res.status(404).json(
                {
                    message:"No property found in databse with this particualr id"
                }
             )
           }

           if (property.createdBy.toString()!==req.user.id)
           {
               console.log("you are not allowed to update the property becasue you did not create it bro");

               return res.status(403).json(
                {
                    message:"You are not the one who created this property details so you are not allowed to update it "
                }
               )
           }

           const updatedproperty=await Property.findByIdAndUpdate(propertyid,
            {$set:updates},
            { new: true, runValidators: true }

           )
           if (!updatedproperty)
           {
              console.log("update has no been done in dtabse")
              res.status(400).json(
                {
                    message:"Not updated in database"
                }
              )
           }
           console.log("updated the property succesfully bro");

           res.status(200).json(
            {
                message:"Updated suceessfully in database bro",
                propertydetails:updatedproperty

            }
           )
      }


      catch(e)
      {
           console.error(e);
           return res.status(400).json(
            {
                message:"NOt updated in data base"
            }
           )
      }
})


export default router
