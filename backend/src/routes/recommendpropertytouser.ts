// import express from 'express'
// import authmiddleware from '../middleware/authmiddleware'
// import User from '../db/userschema'
// import mongoose from 'mongoose'
// const router=express.Router()

// router.use(express.json())
// interface recommnedproperty{
//     email:string,
//     propertyid:string
// }

// router.post('/property',authmiddleware,async function(req:any,res:any)
// {
//         try 
//         {
//                 const body:recommnedproperty=req.body;
//                 if(!body)
//                 {
//                        console.log("No data found")
//                        return res.status(400).json(
//                         {
//                             message:"NO Proper data revieved for recommendation here"
//                         }
//                        )
//                 }
//                 const recommendinguserid=req.user.id;

//                 if (!recommendinguserid)
//                 {
//                      console.log("no user recommendind id was found")
//                      return res.status(400).json(
//                         {
//                             message:"not authenticated user found heree"
//                         }
//                      )
//                 }

//                 const recipient:any=await User.findOne({email:body.email})
//                 if (!recipient)
//                 {
//                      console.log("the rcipient is not found for this particular id")
//                       return res.status(404).json({ message: "reciepient user not found" });

//                 }

//                  const propertyObjectId = new mongoose.Types.ObjectId(body.propertyid);
//                 if (!recipient.recommendedToMe.includes(propertyObjectId))
//                 {
//                      recipient.recommendedToMe.push(propertyObjectId)

//                      await recipient.save()
//                 } 

//                 const sender= await User.findById(req.user.id)


//                 const alreadyRecommended=sender?.recommendedByMe.some(function(entry)
//             {
//                  return entry.propertyId.toString()===body.propertyid && entry.toUserId===recipient._id?.toString()
//             })

//             if (!alreadyRecommended)
//             {
//                  sender?.recommendedByMe.push({
//                     propertyId:propertyObjectId,
//                     toUserId:recipient._id
//                  })

//                  await sender?.save()
//             }

//             res.status(200).json({ message: "Property recommended successfully." });


//         }

//         catch (rror)
//         {
//              console.error("Error recommending property:", err);
//     res.status(500).json({ message: "Internal server error" });
//         }
// })


// export default router


import express from 'express';
import authmiddleware from '../middleware/authmiddleware';
import User from '../db/userschema';
import mongoose from 'mongoose';

const router = express.Router();
router.use(express.json());

interface RecommendProperty {
  email: string;
  propertyid: string;
}

router.post('/property', authmiddleware, async function (req: any, res: any) {
  try {
    const body: RecommendProperty = req.body;

    if (!body) {
      return res.status(400).json({
        message: 'No proper data received for recommendation.',
      });
    }

    const recommendingUserId = req.user.id;
    if (!recommendingUserId) {
      return res.status(400).json({
        message: 'No authenticated user  recommending userid found.',
      });
    }

    const recipient: any = await User.findOne({ email: body.email });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found.' });
    }

    const propertyObjectId = new mongoose.Types.ObjectId(body.propertyid);

    // Check if already recommended to recipient
    const alreadyInRecipient = recipient.recommendedToMe.some(function (id:any) {
      return id.toString() === propertyObjectId.toString();
    });

    if (!alreadyInRecipient) {
      recipient.recommendedToMe.push(propertyObjectId);
      await recipient.save();
    }

    // Add to sender's recommendedByMe
    const sender = await User.findById(recommendingUserId);

    const alreadyRecommended = sender?.recommendedByMe.some(function (entry) {
      return (
        entry.propertyId.toString() === body.propertyid &&
        entry.toUserId.toString() === recipient._id.toString()
      );
    });

    if (!alreadyRecommended) {
      sender?.recommendedByMe.push({
        propertyId: propertyObjectId,
        toUserId: recipient._id,
      });

      await sender?.save();
    }

    res.status(200).json({ message: 'Property recommended successfully.' });
  } catch (err) {
    console.error('Error recommending property:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
