import express from 'express';
import { verifyAdmin, verifyToken } from '../utils/verifyToken.js';
import Products from '../models/Products.js'
import Category from '../models/Category.js'
import slugify from 'slugify';
import braintree from 'braintree';
import Order from '../models/Order.js';
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()

//PAYMENT GETAWAY
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//CREATE NEW PRODUCT
router.post('/createProduct', verifyToken, verifyAdmin, async (req, res) => {
    const { name, description, price, category, quantity } = req.body.productDetails
    const { url } = req.body
    console.log(req.body)
    try {
        if (!name || !description || !price || !category || !quantity) {
            return res.send("All the fields are required")
        }
        const products = await new Products({ ...req.body.productDetails, photo: url, slug: slugify(name) }).save()
        res.status(200).send({ message: "New Product created", products })
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
});

//UPDATE PRODUCT
router.put('/updateProduct/:id', verifyToken, verifyAdmin, async (req, res) => {
    const { name, description, price, category, quantity, shipping } = req.body.productDetails
    try {
        if (!name || !description || !price || !category || !quantity) {
            return res.send("All the fields are required")
        }
        const products = await Products.findByIdAndUpdate(req.params.id,
            { ...req.body.productDetails, photo: req.body.url, slug: slugify(name) },
            { new: true }
        )
        res.status(200).send({ message: "Product updated", products })
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
});

//GET ALL PRODUCTS
router.get('/getAllProducts', async (req, res) => {
    try {
        const products = await Products.find()
            .populate('category')
            .limit(12)
            .sort({ createdAt: -1 })
        res.status(200).send({ totalProducts: products.length, products })
    } catch (error) {
        res.send({ error: error.message });
        console.log(error)
    }
})

//GET SINGLE PRODUCTS
router.get('/getSingleProduct/:slug', async (req, res) => {
    try {
        const product = await Products.findOne({ slug: req.params.slug }).populate('category')
        res.status(200).send(product)
    } catch (error) {
        res.send({ error: error.message });
        console.log(error)
    }
})

//DELETE PRODUCT
router.delete('/deleteProduct/:id', verifyToken, verifyAdmin, async (req, res) => {
    const { id } = req.params
    try {
        const category = await Products.findByIdAndDelete(id)
        res.status(200).send({ message: "Product deleted successfully" })
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})

//FILTER PRODUCT
router.post('/filterProducts', async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        //if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await Products.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//SEARCH FILTER
router.get('/search', async (req, res) => {
    try {
        // In MongoDB, the $or operator is a logical operator that performs a logical OR operation on an array of two or more expressions. 
        // It returns true if at least one of the expressions evaluates to true. 
        // In the context of your search functionality, it allows you to search for documents where either the name or the description field contains the specified keyword.

        // { name: { $regex: searchKeyword, $options: 'i' } }: This expression searches for documents 
        // where the name field matches the specified regular expression. The $regex operator is used for 
        // regular expression matching, and the $options: 'i' option makes the search case-insensitive.
        const keyword = req.query.searchWord
        const results = await Products.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        })
        res.send(results)
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})

router.get('/similarProducts/:pid/:cid', async (req, res) => {
    try {
        const { pid, cid } = req.params
        //We are finding products on the basis of category.
        //And also removing the currently selected product from the list using $ne.
        //It is a mongodb operator which is used to not include something.
        const products = await Products.find({
            category: cid,
            _id: { $ne: pid }
        })
        res.send(products)
    } catch (error) {
        res.send({ message: "Error while getting similar products", error });
    }
})

router.get('/productCategory/:slug', async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug })
        const products = await Products.find({ category })
        res.send({ products, category })
    } catch (error) {
        res.send(error)
    }
})

router.get('/token', verifyToken, async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.send(err)
            }
            else {
                res.send(response)
            }
        })
    } catch (error) {

    }
})

router.post('/payment', verifyToken, async (req, res) => {
    try {
        const { nonce, cart } = req.body
        let total = 0
        cart.map((i) => {
            total += i.price
        })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            function (err, result) {
                if (result) {
                    const order = new Order({
                        products: cart,
                        payment: result,
                        buyer: req.user._id
                    }).save()
                    res.send(order)
                }
            }
        )
        
    } catch (error) {
        console.log(error)
    }
})

export default router