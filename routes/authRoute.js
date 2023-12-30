import express from 'express';
import User from '../models/User.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { verifyAdmin, verifyToken } from '../utils/verifyToken.js';
import Order from '../models/Order.js';
const router = express.Router();

router.post("/signup", async (req,res)=>{
    const {name, email, password} = req.body    

    try{
        if(!name || !email || !password){
            res.status(422).json("please enter all fields")
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new User({
                name,
                email,
                password:hash,
            })
            await newUser.save();
            res.json("user has been successfully created");
        }
    }catch(err){
        res.send(err)
    }
})

router.post("/signin",async (req,res)=>{
    const {name, password} = req.body
    try {
        if(!name || !password){
            res.status(422).json("please enter all fields")
        }
        else{
            const existUser = await User.findOne({name})
            if(!existUser){
                return res.status(400).json("Wrong username or password entered")  
            }
            const isPasswordCorrect = await bcrypt.compare(
                password,existUser.password
            );
            if (!isPasswordCorrect){
                return res.status(400).json("Wrong username or password entered");
            }
            const token = jwt.sign({id:existUser._id},process.env.JWT,{expiresIn:'7d'});

            res.status(200).send({token,existUser})
        }
    } catch (error) {
        return res.status(422).json(error);
    }
})

router.put('/profile',verifyToken,async(req,res)=>{
    try {
        const {name,address,phone} = req.body
        const user = await User.findById(req.user_id)
        
        const updatedUser = await User.findByIdAndUpdate(req.user._id,{
            name:name||user.name,
            // password:password||user.password,
            phone:phone||user.phone,
            address:address||user.address,
        },{new:true})
        res.send(updatedUser)
    } catch (error) {
        console.log(error)
    }
})

router.get('/orders',verifyToken,async(req,res)=>{
    try {
        const orders = await Order.find({buyer:req.user._id}).populate("products").populate("buyer","name")
        res.send(orders)
    } catch (error) {
        console.log(error)
    }
})
//GET ALL ORDERS
router.get('/allOrders',verifyToken, verifyAdmin, async(req,res)=>{
    try {
        const orders = await Order.find().populate("products").populate("buyer","name").sort({createdAt:"-1"})
        res.send(orders)
    } catch (error) {
        console.log(error)
    }
})

router.put('/updateStatus/:orderId', verifyToken, verifyAdmin, async(req,res)=>{
    try {
        const {orderId} = req.params
        const {status} = req.body
        const orders = await Order.findByIdAndUpdate(orderId, {status}, {new:true})
        res.send(orders)
    } catch (error) {
        console.log(error)
    }
})

export default router
