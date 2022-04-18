import STRINGS from '../constant';
import axios from 'axios';


export const getProducts = async () => {
    return new Promise((res, rej) => {
      axios.post(STRINGS.url+'/products')
      .then(response => {
          // console.log(response.data);
          res(response.data)
      }).catch(c => {
        rej(c)
      });
    })
};

export const addProducts = async (data) => {
  var p = {
    product: data
  }
  return new Promise((res, rej) => {
    axios.post(STRINGS.url+'/addProduct', p)
    .then(response => {
        console.log(response.data);
        res();
    }).catch(c => {
      rej(c);
    });
  })
};


export const updateProduct = async (data) => {
  var p = {
    product: data
  }
  return new Promise((res, rej) => {
    axios.post(STRINGS.url+'/updateProducts', p)
    .then(response => {
        console.log(response.data);
        res();
    }).catch(c => {
      rej(c);
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
        // console.log(response.data);
        res(response.data)
    }).catch(c => {
      rej(c)
    });
  })
};

export const removeFavorite = async (product, userid) => {
  var data = {
    user_id: userid,
    product_id: product._id
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
    product_id: product._id
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

export const createOrder = async (data) => {
  const orderItem = {
    order: data
  }
  return new Promise((res, rej) => {
    axios.post(STRINGS.url+'/createOrder',orderItem)
    .then(response => {
        res(response);
    }).catch(c => {
      rej(c)
    });
  })
};

export const getOrder = async (userid) => {
  var data ={
    user_id: userid
  }
  return new Promise((res, rej) => {
    axios.post(STRINGS.url+'/getOrder',data)
    .then(response => {
      console.log(response.data);
        res(response.data);
    }).catch(c => {
      rej(c)
    });
  })
};



