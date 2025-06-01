import express from 'express'
import authmiddleware from '../middleware/authmiddleware';
import User from '../db/userschema';

const router=express.Router();
router.use(express.json())

router.post('/favorites/:id',authmiddleware,async function (req:any,res:any)
{
        try 
        {
              const propertyid=req.params.id;

              if (!propertyid)
              {
                   console.log("No property id found ")
                   return res.status(400).json(
                    {
                        message:"No propert id has been sent in params"
                    }
                   )
              }

              const userid=req.user.id;

              if (!userid)
              {
                 console.log("no user id found ")
                  return res.status(400).json(
                    {
                        message:"No user id found"
                    }
                   )

              }

              const user:any=await User.findById(userid)

              if (!user)
              {
                  console.log("no user found with this particualr id");

                  return res.status(400).json(
                    {
                        message:"No user found with particualr id"
                        
                    }
                  )
              }
              const alreadyfavourite=user.favorites.includes(propertyid);

              if (alreadyfavourite)
              {
                   user.favorites=user.favorites.filter(function(val:any)
                {
                     return val.toString()!==propertyid
                })

                await user.save();
      return res.status(200).json({ message: 'Removed from favorites' });
              }

              else 
              {
                   user.favorites.push(propertyid)
                    await user.save();
      return res.status(200).json({ message: 'Added to favorites' });
              }


        }

        catch(e)
        {
               console.error('Error toggling favorite:', e);
    return res.status(500).json({ message: 'Internal server error' });
        }
})

export default router