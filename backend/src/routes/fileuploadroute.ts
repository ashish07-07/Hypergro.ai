import express from 'express'
const router=express.Router()
import multer = require('multer')
import Property from '../db/schema'
router.use(express.json())
const upload=multer({dest:'uploads'})
const fs=require('fs')
import csvParser = require('csv-parser')
import authmiddleware from '../middleware/authmiddleware'
interface Propertydetails{

  id:string,
  title:string,
  type:string,
price:number,

  state:string,
  city:string,
  areaSqFt:number,
  bedrooms:number,
  bathrooms:number,
  amenities:string[],
  furnished:string,
  availableFrom:Date,
  listedBy:string,
  tags:string[],
  colorTheme:string,
  rating:number,
  isVerified:string,
  listingType:string
}

router.post('/csvfile',authmiddleware,upload.single('csvFile'),function(req:any,res:any)
{
      try 
      {
          console.log(`i got the field here that is ${req}`) 
             if (!req.file)

            {
                    return res.status(400).json(
                        {
                            message:"No file was found "
                        }
                    )
                  
            }

            const result:Propertydetails[]=[]
            fs.createReadStream(req.file.path).pipe(csvParser())
            .on('data',function (data:any)
        {       
               let newdata:any={};

              

               let ameni=data.amenities;
               let splittedemmi=ameni.split("|")
         
               let tagbit=data.tags;
               let splittedtags=tagbit.split("|");
               newdata={
                ...data,
                price:Number(data.price),
                areaSqFt:Number(data.areaSqFt),
                bedrooms:Number(data.bedrooms),
                bathrooms:Number(data.bathrooms),
                availableFrom:new Date(data.availableFrom),
                amenities:splittedemmi,
                tags:splittedtags,
                rating:Number(data.rating),
                isVerified:data.isVerified.toLowerCase()==="true",
                createdBy:req.user.id


                


                
               }

               console.log(newdata)

               result.push(newdata)

        })
        .on('end',async function ()
    {    
        
        fs.unlink(req.file.path,function(error:any)
    {
                if (error)  
                {
                       console.error('Error deleting file:', error);
                } 
    })


    await Property.insertMany(result)
    res.status(201).json(
        {
             message:"CSV Uploaded and inserted succesfully to databse baba",
             propertydata:result
        }
    )


    }).on('error',function (eror:any)
{
        console.error('Error parsing')
        res.status(500).send("Error parsing csv")      
})

      }

      catch (e)
      {
            console.error("something went wrong",e)
            return res.status(500).json({
                message:e
            })
      }
})


export default router


// id,title,type(bunglow,villa,apartment) ,price,state,city,areasqft,bedrerooms,bathrooms,amenities,furnished,availalbe,listedby,tags,colorthem,rating,isverified,listingtype