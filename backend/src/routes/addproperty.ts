import express from 'express'
const router=express.Router()
router.use(express.json())
import authmiddleware from '../middleware/authmiddleware'
import { IProperty } from '../db/schema'
import Property from '../db/schema'

router.post('/details',authmiddleware,async function (req:any,res:any)
{    
    try 
    {
     const body:IProperty=req.body;
     if (!body)
     {
         console.log("give proper propery fileds")

         return res.status(400).json(
            {
                message:"Give all the valid propert details and dont miss anything as every details is necessary"
            }
         )
     }

     

    const propertyadded= await Property.create(
        {
              id:body.id,
              title:body.title,
              type:body.type,
              price:body.price,
              state:body.state,
              city:body.city,
              areaSqFt:body.areaSqFt,
              bedrooms:body.bedrooms,
              bathrooms:body.bathrooms,
              amenities:body.amenities,
              furnished:body.furnished,
              listedBy:body.listedBy,
              tags:body.tags,
              colorTheme:body.colorTheme,
              rating:body.rating,
              isVerified:body.isVerified,
              listingType:body.listingType,
              createdBy:req.user.id,
              availableFrom:body.availableFrom

        }
     )

     if (!propertyadded)
     {
         console.log("errror while adding property to ")

         return res.status(400).json(
            {
                message:"Error while adding the property by user.Pls make sure include all propertydetails"
            }
         )
     }

    
     console.log("nice you have added the data to the datbase")

     return res.status(201).json(
        {
            message:"Data added sucdesfully to the data base",
            data:propertyadded
        }
     )
    }

    catch(e)
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
