// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv';
// import Property from '../db/schema';
// import { request } from 'express';
// dotenv.config();


// export async function Propertyaddedbycheck(req:any,res:any,next:any)
// {

//         // interface Propertydetails{

//         //        propertid:string,
               
//         // } 

//         // try 
//         // { 

//         //      const body
//         //     const authorization=req.header.authorization;
//         //    if (!authorization)
//         //   {
//         //       console.log("authorization header is not sent pleae send it while making request to update property");
//         //       return res.status(400).json(
//         //         {
//         //             message:'No authorization header has been sent'
//         //         }
//         //       )
//         //   }
//         //   const token=authorization.split(" ")[1];

//         // if (!token)
//         // {
//         //      console.log("no token has been found in authorization header")

//         //      return res.status(401).json(
//         //         {
//         //              message:"No token found in the auhorization header"
//         //         }
//         //      )
//         // }

//         // const secret=process.env.JWTSECRET;

//         // if (!secret)
//         // {
//         //      console.log("no secret of jwt found")

//         //      return 
//         // }

//         // const decodedtoken=await jwt.verify(token,secret)

//         //   if (!decodedtoken)
//         //   {
//         //      console.log("was not able to decode from")
//         //   }

//         //   const decoded:any=decodedtoken;

//         //   const propertydetails=await Property.find(
//         //     {
//         //          createdBy:decoded.id
//         //     }
//         //   )

//         //   if (!propertydetails)
//         //   {
//         //        console.log("this property is not created by you")

//         //        return res.status(400).json(
//         //         {
//         //             message:"this propert is not created by you"
//         //         }
//         //        )
//         //   }


//         // }



//         catch(e)
//         {
//             console.error(e)
//             return res.status(400).json({
//                 message:e
//             })
//         }

        







// } 