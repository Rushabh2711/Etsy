const db = require('../database');
const ProductModel = require('../Models/ProductModel');

class Product {

    static async getProduct() {
        // const query = "SELECT * FROM product";
        return new Promise( async (res, rej) => {
            // db.query(query, async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     res(result);
            // })
            try {
                const products = ProductModel.find({});
                res(products)
            } catch (e) {
                rej(e);
            }

        })
    }

    static async addProduct(product) {
        // const query = "INSERT INTO product(shop_id, category, count, name ,image , description, price, sell_count) VALUE(?,?,?,?,?,?,?,?)";
        return new Promise( async (res, rej) => {
            // db.query(query,
            //     [product.shop_id, 
            //         product.category, 
            //         product.count, 
            //         product.name, 
            //         product.image,
            //         product.description, 
            //         product.price, 
            //         product.sell_count],
            //     async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     res(result);
            // })
            const newProduct = new ProductModel({
                ...product
            })
            try {
                await newProduct.save();
                res();
            } catch (e) {
                rej(e)
            }
        })
    }

    static async updateProduct(product) {
        // const query = "UPDATE product SET shop_id = ?, category = ?, count = ?, name = ?, description = ?, price = ?, sell_count = ? WHERE product_id = ?";
        return new Promise( async (res, rej) => {
            // db.query(query,
            //     [product.shop_id, 
            //         product.category, 
            //         product.count, 
            //         product.name, 
            //         product.description, 
            //         product.price, 
            //         product.sell_count,
            //         product.product_id],
            //     async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     res(result);
            // })
            try {
                await ProductModel.findByIdAndUpdate(product._id, {
                    ...product
                });
                res();
            } catch (e) {
                rej(e)
            }
        })
    }

    static async addCategory(category, user_id) {
        const query = "INSERT INTO category(name, user_id) VALUES(?,?)";
        return new Promise((res, rej) => {
            db.query(query, [category, user_id] , async (err, result) => {
                if(err) {
                    rej(err);
                }
                try {
                    const category = await this.getCategory(user_id);
                    res(category);
                } catch (e) {
                    rej(e)
                }
            })
        })
    }

    static async getCategory(user_id) {
        const query = "SELECT name FROM category WHERE user_id IN (? , 1)";
        return new Promise((res, rej) => {
            db.query(query, [user_id] , async (err, result) => {
                if(err) {
                    rej(err);
                }
                res(result);
            })
        })
    }



}

module.exports = Product