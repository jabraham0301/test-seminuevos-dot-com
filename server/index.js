// application root
require('dotenv').config({path:'./config/.env'})
const cluster=require('./server')
cluster.listen(process.env.PORT||5000,()=>console.log(`Server listening on port: 5000`))