// application root
require('dotenv').config({path:'./config/.env'})
const cluster=require('./server')
cluster.listen(5000,()=>console.log(`Server listening on port: 5000`))