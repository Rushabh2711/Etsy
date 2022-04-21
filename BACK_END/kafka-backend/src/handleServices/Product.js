const User = require('../service/User');

async function handle_request(msg, callback){
   
    console.log("Inside book kafka backend");
    console.log(msg);
    try{
        await User.addToFavorite(msg.user_id, msg.product_id);
        callback(null, []);
    } catch (e) {
        console.log(e);
        callback(e, null);
    }
    console.log("after callback");
};

exports.handle_request = handle_request;