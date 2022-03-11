const { use } = require('../app');
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
}

module.exports = User;