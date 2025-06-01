import express from 'express'
import authmiddleware from '../middleware/authmiddleware';
import Property from '../db/schema';


const router=express.Router();

router.use(express.json())

router.delete('/property/:id',authmiddleware,async function (req:any,res:any)
{
       try  
       
       {      
        

            console.log("inside the delete route ")
             const propertyid=req.params.id;
                 
                 if (!propertyid)
                 {
                     console.log("no propert id is sent in the params")
                     return res.status(400).json(
                        {
                            message:"No propertyid is sent in params"
                        }
                     )

                 }
        
                 const property=await Property.findById(propertyid)

                 if (!property)
                 {
                       console.log("the id sent is not a valid property id .Please send proper valid id")
                       return res.status(400).json(
                        {
                            messag:"Send correct propertyid"
                        }
                       )
                 }

                 console.log(`the property created is is ${property.createdBy} re baba and thr user who created id is ${req.user.id}`)

                 if (property.createdBy.toString()!==req.user.id)
                 {
                      console.log("you cannot delete the property because you have not created it ")

                      return res.status(400).json(
                        {
                            message:"cannot deelte becasue u did not create it "
                        }
                      )
                 }

                 const deletedproperty=await Property.findByIdAndDelete(propertyid)

                 if (!deletedproperty)
                 {
                     console.log("i did not find any id they was for property so was not able to delete it ")

                     return res.status(400).json(
                        {
                            message:"was not bale to delete the property becsue the property id does not exist "
                        }
                     )
                 }

                 console.log("sucdessfully delated teh propert with id of",propertyid)

                 return res.status(201).json(
                    {
                        message:"deleted the propert for this particualr id"
                    }
                 )

                
       }

       catch (e)
       {     console.error(e)
              return res.status(400).json(
                        {
                            message:"was not bale to delete the property. "
                        }
                     )
       }
})

export default router