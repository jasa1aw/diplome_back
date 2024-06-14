const express = require('express');
const router = express.Router();
const { upload } = require('./multer');
const {addProduct, editProduct, deleteProductByID, getAllProducts, getProductByID} = require('./controller');
const passport = require('passport');
const {isAdmin} = require('../auth/middlewares')

router.post('/api/product/addProduct', passport.authenticate('jwt', { session: false }), isAdmin, upload.single('image'), addProduct);
router.put('/api/product/editProduct', passport.authenticate('jwt', { session: false }), isAdmin, upload.single('image'), editProduct)
router.delete('/api/product/deleteProduct/:id', passport.authenticate('jwt', { session: false }), isAdmin, deleteProductByID);
router.get('/api/product/getAllProducts', getAllProducts);
router.get('/api/product/getProductByID/:id', passport.authenticate('jwt', { session: false }), getProductByID);

module.exports = router;