import React, { Fragment } from 'react';
import styled from 'styled-components';
import loaderImg from '../../assets/images/loader.gif';

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999
`;
const OverlayComtent = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
`;

const SpLoader = ({ isLoading }) => {
    return isLoading &&
        <Overlay>
            <OverlayComtent>
                <img src={loaderImg} alt="Loader" height={100} width={100} />
            </OverlayComtent>
        </Overlay>
};



export default SpLoader