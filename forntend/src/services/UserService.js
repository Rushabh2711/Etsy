var axios = require('axios');


var data = JSON.stringify({
  "username": "Rushabh",
  "password": "rushabh"
});

var config = {
  method: 'post',
  url: 'http://localhost:3001/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
