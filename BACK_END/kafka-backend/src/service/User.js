const db = require('../database');
const UserModel = require('../Models/UserModel');
const ShopModel = require('../Models/ShopModel');

class User {
    static async findUser(username) {
        // const query = "SELECT * FROM user WHERE username = ?";
        return new Promise( async (res, rej) => {
            // db.query(query, [username] , async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     if(result.length === 0) {
            //         rej("Username Not Valid")
            //     }
            //     res(result[0]);
            // })
            try {
                const u1 = await UserModel.findOne({username});
                res(u1);
            } catch (e) {
                rej(e);
            }
        })
    }

    static async findUserData(userid) {
        // const query = "SELECT * FROM user WHERE user_id = ?";
        return new Promise( async (res, rej) => {
            // db.query(query, [userid] , async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     if(result.length === 0) {
            //         rej("User not exist")
            //     }
            //     res(result[0]);
            // })
            try {
                const u1 = await UserModel.findOne({_id: userid});
                res(u1);
            } catch (e) {
                rej(e);
            }
        })
    }

    static async registerUser(user) {
        // const query = "INSERT INTO user(username, email, password) VALUES(?,?,?)";
        return new Promise( async (res, rej) => {
            // db.query(query, [user.username, user.email, user.password] , async (err, result) => {
            //     if(err && err.code === 'ER_DUP_ENTRY') {
            //         rej("Email ID is already registered");
            //     }
            //     if(err) {
            //         rej(err)
            //     }
            //     try {
            //         const u1 = await this.findUser(user.username);
            //         res(u1);
            //     } catch (e) {
            //         rej(e)
            //     }
            // })

            const newUser = new UserModel({
                ...user
            })
            try {
                await newUser.save();
                const u1 = await UserModel.findOne({username: user.username });
                res(u1);
            } catch (e) {
                rej(e)
            }
        })
    }

    static async updateUser(user) {
        // const query = "UPDATE user SET username = ?, email = ?, image = ?, about = ?, dob = ?, address = ?, city = ?, country = ?, gender = ?, phoneno = ? WHERE user_id = ?";
        return new Promise( async (res, rej) => {
            // db.query(query,
            //     [user.username,
            //     user.email,
            //     user.image,
            //     user.about,
            //     user.dob,
            //     user.address,
            //     user.city,
            //     user.country,
            //     user.gender,
            //     user.phoneno,
            //     user.user_id] ,
            //     async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     res(result[0]);
            // })
            try {
                await UserModel.findByIdAndUpdate(user.user_id, {
                    ...user
                });
                const u1 = await UserModel.findOne({_id: user.user_id});
                res(u1);
            } catch (e) {
                rej(e)
            }
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
        // const query = "INSERT INTO favorite(user_id, product_id) VALUES(?,?)";
        return new Promise( async (res, rej) => {
            // db.query(query, [userid, productid] , async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     res();
            // })
            try {
                await UserModel.findByIdAndUpdate(userid, {
                    $push:{"favorite" : productid}
                });
                res();
            } catch (e) {
                rej(e);
            }
        })
    }

    static async removeFavorite(userid, productid) {
        // const query = "DELETE FROM favorite WHERE user_id = ? AND product_id = ?";
        return new Promise( async (res, rej) => {
            // db.query(query, [userid, productid] , async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     res();
            // })
            try {
                await UserModel.findByIdAndUpdate(userid, {
                    $pull:{"favorite" : productid}
                });
                res();
            } catch (e) {
                rej(e);
            }
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
        // const query = "SELECT * FROM shop WHERE user_id = ?";
        return new Promise( async (res, rej) => {
            // db.query(query, [userid], async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     res(result[0]);
            // })
            try {
                const s1 = await ShopModel.findOne({user_id: userid});
                res(s1);
            } catch (e) {
                rej(e);
            }
        })
    }

    static async checkShopAvailability(shopName) {
        // const query = "SELECT shop_id FROM shop WHERE name = ?";
        return new Promise( async (res, rej) => {
            // db.query(query, [shopName], async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     res(result[0]);
            // })
            try {
                const s1 = await ShopModel.findOne({name: shopName});
                s1 ? res(s1._id) : res();
            } catch (e) {
                rej(e);
            }
        })
    }

    static async getShopDetails(shop_id) {
        // const query = "SELECT * FROM shop WHERE shop_id = ?";
        return new Promise( async (res, rej) => {
            // db.query(query, [shop_id], async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     res(result[0]);
            // })
            try {
                const s1 = await ShopModel.findOne({_id: shop_id});
                res(s1);
            } catch (e) {
                rej(e);
            }
        })
    }

    static async addShopDetails(shop) {
        // const query = "INSERT INTO shop(user_id, image, name) VALUES(?,?,?)";
        return new Promise( async (res, rej) => {
            // db.query(query, [shop.userid, shop.image, shop.name] , async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     try {
            //         const shopDetails = await this.findShop(shop.userid);
            //         res(shopDetails)
            //     } catch (error) {
            //         rej(error)
            //     }
            // })
            const newShop = new ShopModel({
                ...shop,
                user_id: shop.userid
            })
            try {
                await newShop.save();
                const s1 = await ShopModel.findOne({name: shop.name });
                res(s1);
            } catch (e) {
                rej(e)
            }
        })
    }

    static async upadteShopDetails(shop) {   
        // const query = "UPDATE shop SET image = ? WHERE shop_id = ?";
        return new Promise( async (res, rej) => {
            // db.query(query,
            //     [shop.image,
            //     shop.shop_id] ,
            //     async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     try {
            //         const shopDetails = await this.getShopDetails(shop.shop_id);
            //         res(shopDetails)
            //     } catch (error) {
            //         rej(error)
            //     }
            // })
            try {
                await ShopModel.findByIdAndUpdate(shop.shop_id, {
                    image: shop.image
                });
                const s1 = await ShopModel.findOne({_id: shop.shop_id});
                res(s1);
            } catch (e) {
                rej(e)
            }
        })
    }

}

module.exports = User;