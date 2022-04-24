const User = require('../service/User');

async function handle_request(msg, callback){
   
    console.log("Inside kafka backend");
    console.log(msg);
    try{
        const user = await User.registerUser(msg);
        callback(null, user);
    } catch (e) {
        console.log(e);
        callback(e, null);
    }
    console.log("after callback");
};

exports.handle_request = handle_request;