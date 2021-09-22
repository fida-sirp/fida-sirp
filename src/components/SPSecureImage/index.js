import React, { useEffect, useState } from 'react';

const SPSecureImage = ({ imgSrc, height = 'auto', width = 'auto' }) => {
    const [image, setImage] = useState(false);

    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', imgSrc, true);
        xhr.responseType = 'arraybuffer';
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('AccessToken'));
        xhr.onload = function (e) {
            if (this.status === 200) {
                setImage(window.URL.createObjectURL(new Blob([this.response])));
            }
        };
        xhr.send();
    }, [imgSrc])

    return (
        <>
            {image && 
                <img
                    src={image}
                    height={height}
                    width={width}
                />}
        </>
    );
}

export default SPSecureImage