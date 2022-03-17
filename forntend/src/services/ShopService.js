import STRINGS from '../constant';
import axios from 'axios';

export const getShopDetails = async (shop_id) => {
    var data = {
        shop_id
    }
    return new Promise((res, rej) => {
      axios.post(STRINGS.url+'/getShopDetails',data)
      .then(response => {
          console.log(response.data);
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
          console.log(response.data);
          res(response.data[0])
      }).catch(c => {
        rej(c)
      });
    })
};