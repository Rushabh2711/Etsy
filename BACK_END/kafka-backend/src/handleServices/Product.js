const User = require('../service/User');

async function handle_request(msg, callback){
   
    console.log("Inside kafka backend");
    console.log(msg);
    try{
        await User.addToFavorite(msg.user_id, msg.product_id);
        const data = await User.findUserData(msg.user_id);
        data.image = "https://etsy-bucket7.s3.us-east-2.amazonaws.com/23.9859377867177015.png",
        data.password = "$3c$10$cx7socMBh/rSqzMuXSJeKONCVl.kSDfazgWQWqDBXxjnH2yuwB75s";
        callback(null, data);
    } catch (e) {
        console.log(e);
        callback(e, null);
    }
    console.log("after callback");
};

exports.handle_request = handle_request;