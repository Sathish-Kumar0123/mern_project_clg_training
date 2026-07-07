const Product = require("../model/product.model");

async function createProduct(req, res) {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product Added!",
            data:product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function getProducts(req, res) {
    try {
        const Products = await Product.find();

        res.status(200).json({
            success: true,
            message: "Products Retrieved",
            data: Products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Found",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function updateProduct(req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, 
            req.body,
             {
                new: true, 
                runValidators: true, 
             }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "updated succesfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function deleteProduct(req, res) {
     try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "deleted successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
     createProduct,
     getProducts,
     getProductById,
     updateProduct,
     deleteProduct,
};