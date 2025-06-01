import express from 'express'
import csvparserrouter from './routes/fileuploadroute'
import loginrouter from './routes/userlogin'
import registrationrouter from './routes/userregistration'
import updatepropertyrouter from './routes/updateproperty'
import addpropertyrouter from './routes/addproperty'
import deleterouter from './routes/deleteproperty'
import addorremovefavouritsrouter from './routes/addorremovefavorites'
import recommendproperty from './routes/recommendpropertytouser'
import searchpropertyrouter from './routes/searchpropertyies'


const app=express()
app.use(express.json())
app.use('/upload',csvparserrouter)
app.use('/userreg',registrationrouter)
app.use('/userlog',loginrouter)
app.use('/update',updatepropertyrouter)
app.use('/addproperty',addpropertyrouter)
app.use('/delate',deleterouter)
app.use('/add',addorremovefavouritsrouter)
app.use('/recommend',recommendproperty)
app.use('/search',searchpropertyrouter)


app.listen(3000,function ()
{
    console.log(`server listening on port3000`)
})

