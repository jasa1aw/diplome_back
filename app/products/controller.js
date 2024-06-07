const fs = require('fs');
const path = require('path');
// const { Op } = require('sequelize');
const Product = require('./Product');

const addProduct = async (req, res) => {
    try {
        if(req.file){
            const product = await Product.create({
                image: '/images/' + req.file.filename,
                name: req.body.name,
                price: req.body.price
            })
            res.status(200).send(product);
        }else{
            res.status(401).send({message: "заполните все поля"});
        }
    } catch (error) {
        console.error('Error deleting item by ID:', error);
        res.status(500).send(error);
    }
};

const editProduct = async (req, res) => {
    try {
        if(req.file){
            const product = await Product.findByPk(req.body.id);

            fs.unlinkSync(path.join(__dirname + '../../../public' + product.image));

            Product.update({
                image: '/images/' + req.file.filename,
                name: req.body.name,
                price: req.body.price
            },
            {
                where: {id: req.body.id}
            });
            
            res.status(200).end();
        }else if(!req.file){
            const product = await Product.findByPk(req.body.id);
            Product.update({
                description: req.body.description,
            },
            {
                where: {id: req.body.id}
            });
        }else{
            res.status(401).send({message: "заполните все поля"});
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteProductByID = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        fs.unlinkSync(path.join(__dirname + '../../../public' + product.image));
        await Product.destroy({
            where: { id: req.params.id }
        })
        res.status(200).send();
    } catch (error) {
        console.error('Error deleting item by ID:', error);
        res.status(500).send(error);
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        if (!products) {
            return res.status(404).send({ message: 'Посты не найден' });
        }
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send('Error while fetching items:', error);
    }
};

const getProductByID = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.id },
        });

        if (!product) {
            return res.status(404).send({ message: 'Пост не найден' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};




module.exports = {addProduct, editProduct, deleteProductByID, getAllProducts, getProductByID};

