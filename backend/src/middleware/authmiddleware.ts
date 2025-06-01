import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export async function authmiddleware(req:any,res:any,next:any)
{       

       try 
       {
             const authoheader=req.headers.authorization;

       if (!authoheader)
       {
          console.log("no header found here");

          return res.status(400).json(
            {
                message:"No authorization header found here "
            }
          )
       }
       const token=authoheader.split(" ")[1];
       if(!token)
       {
           console.log("No token found please enter your token from next time");

           return res.status(401).json(
            {
                message:"No token found.Please send token before"
            }
           )

       }
        const secret=process.env.JWTSECRET

        if (!secret)
        {
             console.log("NO secret env found here")

             return res.status(400).json(
                {
                    message:"NO ENV  found baba"
                }
             )
        }
       const decodedtoken=await jwt.verify(token,secret)

       if (!decodedtoken)
       {
          console.log("please give correct token")
          return res.status(400).json(
            {
                message:"Error the token in not correct "
            }
          )
       }

       req.user=decodedtoken;

       console.log("ok now everything went well here in the auth middleware passing to other part of request now ");

       next()
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
       

}

export default authmiddleware