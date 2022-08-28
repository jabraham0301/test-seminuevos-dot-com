const express=require('express')
const routes=require('./routes')
const cluster=express()
cluster.use(express.json())

cluster.use('/api',routes.scrappingRoutes)

module.exports=cluster