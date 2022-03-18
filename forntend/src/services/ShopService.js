import STRINGS from '../constant';
import axios from 'axios';

export const getShopDetails = async (shop_id) => {
    var data = {
        shop_id
    }
    return new Promise((res, rej) => {
      axios.post(STRINGS.url+'/getShopDetails',data)
      .then(response => {
          // console.log(response.data);
          res(response.data)
      }).catch(c => {
        rej(c)
      });
    })
};

export const getUserShopDetails = async (user_id) => {
    var data = {
        user_id
    }
    return new Promise((res, rej) => {
      axios.post(STRINGS.url+'/findShop',data)
      .then(response => {
          // console.log(response.data);
          res(response.data)
      }).catch(c => {
        rej(c)
      });
    })
};

export const checkShopAvailability = async (shopName) => {
  return new Promise((res, rej) => {
    axios.post(STRINGS.url+'/checkShopAvailability',{shopName})
    .then(response => {
        // console.log(response.data);
        res(response.data)
    }).catch(c => {
      rej(c)
    });
  })
};

export const addShopDetails = async (shopName, userid) => {
  var data = {
    userid,
    name: shopName
  }
  return new Promise((res, rej) => {
    axios.post(STRINGS.url+'/addShopDetails',data)
    .then(response => {
        // console.log(response.data);
        res(response.data)
    }).catch(c => {
      rej(c)
    });
  })
};


