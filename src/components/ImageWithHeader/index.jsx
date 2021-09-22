import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Divider, Image } from 'antd';
import styled from 'styled-components';

export const SImage = styled(Image)`
  padding: 5px;
`;

function ImageWithHeader({ width, path }) {
    const [uploadImage, setUploadImage] = useState(""); 
    const userToken = localStorage.getItem('AccessToken');
    axios.get(path, { headers: { Authorization: 'Bearer ' + userToken,}, responseType: 'arraybuffer'}).then((res) => {

        const data = new Uint8Array(res.data);
        const raw = String.fromCharCode.apply(null, data);
        const base64 = btoa(raw);
        const src = "data:image;base64," + base64;
  
       
        setUploadImage(src);
      });
  return (
   
        <SImage width={width} src={uploadImage} />
   
  );
}

export default ImageWithHeader;

