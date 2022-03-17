const db = require('../database');

class User {
    static async findUser(username) {
        const query = "SELECT * FROM user WHERE username = ?";
        return new Promise((res, rej) => {
            db.query(query, [username] , async (err, result) => {
                if(err) {
                    rej(err);
                }
                if(result.length === 0) {
                    rej("Username Not Valid")
                }
                res(result[0]);
            })
        })
    }

    static async registerUser(user) {
        const query = "INSERT INTO user(username, email, password) VALUES(?,?,?)";
        return new Promise((res, rej) => {
            db.query(query, [user.username, user.email, user.password] , async (err, result) => {
                if(err && err.code === 'ER_DUP_ENTRY') {
                    rej("Email ID is already registered");
                }
                if(err) {
                    rej(err)
                }
                try {
                    const u1 = await this.findUser(user.username);
                    res(u1);
                } catch (e) {
                    rej(e)
                }
            })
        })
    }

    static async updateUser(user) {
        const query = "UPDATE user SET username = ?, password = ?, about = ?, dob = ?, address = ?, city = ?, country = ?, gender = ?, phoneno = ? WHERE user_id = ?";
        return new Promise((res, rej) => {
            db.query(query,
                [user.username,
                user.password,
                user.about,
                user.dob,
                user.address,
                user.city,
                user.country,
                user.gender,
                user.phoneno,
                user.user_id] ,
                async (err, result) => {
                if(err) {
                    rej(err);
                }
                res(result[0]);
            })
        })
    }

    static async findFavorite(userid) {
        const query = "SELECT product_id FROM favorite WHERE user_id = ?";
        return new Promise((res, rej) => {
            db.query(query, [userid] , async (err, result) => {
                if(err) {
                    rej(err);
                }
                res(result);
            })
        })
    }

    static async addToFavorite(userid, productid) {
        const query = "INSERT INTO favorite(user_id, product_id) VALUES(?,?)";
        return new Promise((res, rej) => {
            db.query(query, [userid, productid] , async (err, result) => {
                if(err) {
                    rej(err);
                }
                res();
            })
        })
    }

    static async removeFavorite(userid, productid) {
        const query = "DELETE FROM favorite WHERE user_id = ? AND product_id = ?";
        return new Promise((res, rej) => {
            db.query(query, [userid, productid] , async (err, result) => {
                if(err) {
                    rej(err);
                }
                res();
            })
        })
    }

    static async getCountries() {
        const query = "SELECT * FROM country";
        return new Promise((res, rej) => {
            db.query(query, async (err, result) => {
                if(err) {
                    rej(err);
                }
                res(result);
            })
        })
    }

    static async findShop(userid) {
        const query = "SELECT * FROM shop WHERE user_id = ?";
        return new Promise((res, rej) => {
            db.query(query, [userid], async (err, result) => {
                if(err) {
                    rej(err);
                }
                res(result);
            })
        })
    }

    static async checkShopAvailability(shopName) {
        const query = "SELECT shop_id FROM shop WHERE name = ?";
        return new Promise((res, rej) => {
            db.query(query, [shopName], async (err, result) => {
                if(err) {
                    rej(err);
                }
                res(result);
            })
        })
    }

    static async getShopDetails(shop_id) {
        const query = "SELECT * FROM shop WHERE shop_id = ?";
        return new Promise((res, rej) => {
            db.query(query, [shop_id], async (err, result) => {
                if(err) {
                    rej(err);
                }
                res(result[0]);
            })
        })
    }

    static async addShopDetails(shop) {
        const query = "INSERT INTO shop(user_id, image, name) VALUES(?,?,?)";
        return new Promise((res, rej) => {
            db.query(query, [shop.userid, shop.image, shop.name] , async (err, result) => {
                if(err) {
                    rej(err);
                }
                try {
                    const shopDetails = await this.findShop(shop.userid);
                    res(shopDetails)
                } catch (error) {
                    rej(error)
                }
            })
        })
    }

    //  --------------- need to change ---------------------
    // static async upadteShopDetails(user) {   
    //     const query = "UPDATE shop SET username = ?, password = ?, about = ?, dob = ?, address = ?, city = ?, country = ?, gender = ?, phoneno = ? WHERE user_id = ?";
    //     return new Promise((res, rej) => {
    //         db.query(query,
    //             [user.username,
    //             user.password,
    //             user.about,
    //             user.dob,
    //             user.address,
    //             user.city,
    //             user.country,
    //             user.gender,
    //             user.phoneno,
    //             user.user_id] ,
    //             async (err, result) => {
    //             if(err) {
    //                 rej(err);
    //             }
    //             res(result[0]);
    //         })
    //     })
    // }

}

module.exports = User;