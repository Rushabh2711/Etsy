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

export const updateUserDetails = async (data) => {
  var update = {
    user: data
  }
  return new Promise((res, rej) => {
    axios.post(STRINGS.url+'/update',update)
    .then(response => {
        console.log(response.data);
        res()
    }).catch(c => {
      // console.log(c);
      rej(c)
    });
  })
};

export const insertImage = async (imageFile,id) => {
  const imageFormData = new FormData();
  imageFormData.append("image", imageFile);
  console.log("image data",imageFile);
  const response = await axios.post(STRINGS.url + '/imageUpload/' + id, imageFormData);
  // const callParams = getFileUploadCallParams(formData);
  // const response = await makeCall(URLS.insertImage, callParams);
  return response.data;
};
