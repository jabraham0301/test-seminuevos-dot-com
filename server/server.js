const express=require('express')
const cors=require('cors')
const path=require('path')
const routes=require('./routes')
const cluster=express()
cluster.use(express.json())
cluster.use(cors())
cluster.use('/api',routes.scrappingRoutes)

module.exports=cluster