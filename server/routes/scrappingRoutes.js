const express=require('express')
const path=require('path')
const {scrappingControllers}=require('../controllers')
const scrappingRoutes=express.Router()

scrappingRoutes.post('/post_vehicle',(req,res)=>{
    let {price,description}=req.body
    scrappingControllers.insertPost(price,description).then(()=>{
        res.sendFile('post.png',{
            root:path.dirname('static/post.png')
        })
    })
})

module.exports=scrappingRoutes