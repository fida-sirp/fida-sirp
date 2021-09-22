import axios from 'axios';
import { isString } from 'lodash';

const getImageFromURL = async path => {
  const userToken = localStorage.getItem('AccessToken');
  try {
    const res = await axios.get(path, {
      headers: { Authorization: 'Bearer ' + userToken },
      responseType: 'arraybuffer',
    });
    console.log({ getImageFromURL: res });
    const data = new Uint8Array(res.data);
    const raw = String.fromCharCode.apply(null, data);
    const base64 = btoa(raw);
    const src = 'data:image;base64,' + base64;
    let isImage = false;
    if (
      isString(path) &&
      ['png', 'jpg', 'gif', 'jpeg'].includes(
        path.split('.')?.[path.split('.').length - 1]
      )
    ) {
      isImage = true;
    }

    return { src, isImage, path };
  } catch (error) {
    console.log({ error });
    return;
  }
};

const CommentsUtils = {
  getImageFromURL,
};

export default CommentsUtils;
