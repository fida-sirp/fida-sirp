import React from 'react';
import axios from 'axios';

const ImageLoader = ({ url, style }) => {
  const [imgSrc, setImgSrc] = React.useState();
  React.useEffect(() => {
    getImage();
  }, [url]);
  const getImage = async () => {
    const userToken = localStorage.getItem('AccessToken');
    try {
      const res = await axios.get(url, {
        headers: { Authorization: 'Bearer ' + userToken },
        responseType: 'arraybuffer',
      });
      console.log({ getImageFromURL: res });
      const data = new Uint8Array(res.data);
      const raw = String.fromCharCode.apply(null, data);
      const base64 = btoa(raw);
      const src = 'data:image;base64,' + base64;
      setImgSrc(src);
    } catch (error) {
      console.log({ error });
      return;
    }
  };
  return <img src={imgSrc} style={style} />;
};

export default ImageLoader;
