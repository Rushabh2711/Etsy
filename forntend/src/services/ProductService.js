import STRINGS from '../constant';
import axios from 'axios';


export const getProducts = async () => {
    return new Promise((res, rej) => {
      axios.post(STRINGS.url+'/products')
      .then(response => {
          console.log(response.data);
          res(response.data)
      }).catch(c => {
        rej(c)
      });
    })
};

export const getFavorite = async (user_id) => {
  var data = {
    user_id
  };
  return new Promise((res, rej) => {
    axios.post(STRINGS.url+'/favorite',data)
    .then(response => {
        console.log(response.data);
        res(response.data)
    }).catch(c => {
      rej(c)
    });
  })
};

export const removeFavorite = async (product, userid) => {
  var data = {
    user_id: userid,
    product_id: product.product_id
  };
  return new Promise((res, rej) => {
    axios.post(STRINGS.url+'/removeFavorite',data)
    .then(response => {
        res(response);
    }).catch(c => {
      rej(c)
    });
  })
};

export const addFavotite = async (product, userid) => {
  var data = {
    user_id: userid,
    product_id: product.product_id
  };
  return new Promise((res, rej) => {
    axios.post(STRINGS.url+'/addFavorite',data)
    .then(response => {
        res(response);
    }).catch(c => {
      rej(c)
    });
  })
};
