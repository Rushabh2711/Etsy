var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const secret = "CMPE273ETSY";
const User = require('../Models/UserModel');

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            console.log(jwt_payload);            
            if("_id" in jwt_payload){
                let id = jwt_payload._id;
                Customers.findOne({_id:id}, (err, results) => {
                    if (err) {
                        return callback(err, false);
                    }
                    if (results) {
                        callback(null, results);
                    }
                    else {
                        callback(null, false);
                    }
                });
            } else{
                return callback(null, false);
            }
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


