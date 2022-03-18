import axios from 'axios';
import STRINGS from '../constant';

export const getUserDetails = async (user_id) => {
  var data = {
    userid: user_id
  }
  return new Promise((res, rej) => {
    axios.post(STRINGS.url+'/getUserData',data)
    .then(response => {
        console.log(response.data);
        res(response.data)
    }).catch(c => {
      // console.log(c);
      rej(c)
    });
  })
};
