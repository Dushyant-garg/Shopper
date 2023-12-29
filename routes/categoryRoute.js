import express from 'express';
import slugify from 'slugify';
import { verifyAdmin, verifyToken } from '../utils/verifyToken.js';
import Category from '../models/Category.js';
const router = express.Router();
//CREATE CATEGORY
router.post('/createCategory',verifyToken,verifyAdmin,async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name) {
            return res.send({message:"name is required"});
        }
        const existing = await Category.findOne({name})
        if(existing){
            return res.send({message:"category already exists"})
        }
        const category = await new Category({name,slug:slugify(name)}).save()
        res.status(200).send({message:"New category created" ,category})

    } catch (error) {
        res.send(error)
    }
})
//UPDATE CATEGORY
router.put('/updateCategory/:id',verifyToken,verifyAdmin,async(req,res)=>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await Category.findByIdAndUpdate(id,
            {name,slug:slugify(name)},
            {new:true}
        )
        res.status(200).send({message:"Name updated", category})
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})
//GET SINGLE CATEGORY
router.get('/getSingleCategory/:slug',async(req,res)=>{
    const {slug} = req.params
    try {
        const category = await Category.findOne({slug})
        res.send(category)
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})
//GET ALL CATEGORIES
router.get('/getAllCategories',async(req,res)=>{
    try {
        const categories = await Category.find()
        res.send(categories)
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})
//DELETE CATEGORY
router.delete('/deleteCategory/:id',verifyToken,verifyAdmin, async(req, res)=>{
    const {id} = req.params
    try {
        const category = await Category.findByIdAndDelete(id)
        res.status(200).send({message:"Category deleted successfully"})
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})

export default router