const db = require('../database');

class Product {

    static async getProduct() {
        const query = "SELECT * FROM product";
        return new Promise((res, rej) => {
            db.query(query, async (err, result) => {
                if(err) {
                    rej(err);
                }
                res(result);
            })
        })
    }

    static async addProduct(product) {
        const query = "INSERT INTO product(shop_id, category_id, count, name ,image , description, price, sell_count) VALUE(?,?,?,?,?,?,?,?)";
        return new Promise((res, rej) => {
            db.query(query,
                [product.shop_id, 
                    product.category_id, 
                    product.count, 
                    product.name, 
                    product.image,
                    product.description, 
                    product.price, 
                    product.sell_count],
                async (err, result) => {
                if(err) {
                    rej(err);
                }
                res(result);
            })
        })
    }

    static async updateProduct(product) {
        console.log(product);
        const query = "UPDATE product SET shop_id = ?, category_id = ?, count = ?, name = ?, description = ?, price = ?, sell_count = ? WHERE product_id = ?";
        return new Promise((res, rej) => {
            db.query(query,
                [product.shop_id, 
                    product.category_id, 
                    product.count, 
                    product.name, 
                    product.description, 
                    product.price, 
                    product.sell_count,
                    product.product_id],
                async (err, result) => {
                if(err) {
                    rej(err);
                }
                res(result);
            })
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