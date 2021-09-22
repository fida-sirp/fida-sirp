import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CardBoxItem,ImagDivBlox, ImgStyle, DescriptionBox, TitleStyle, DesStyle } from './StyledComponents';
import shapBox from '../../../../../assets/images/ShapeBox.png'

const HelpCard = ({data}) => {
  const history = useHistory();
  return (
    <>
        <CardBoxItem className="child-box" onClick={() => history.push('/help/'+data.shp_id)}  >
          <div className="text-block-img">
            <ImagDivBlox>
            <ImgStyle src={data.icons} alt="Data" />
            </ImagDivBlox>
          
          </div>
          <DescriptionBox>
            <TitleStyle>
              {data.shp_name}
            </TitleStyle>
            <DesStyle>
              {data.shp_short_description}
            </DesStyle>
          </DescriptionBox>
         
        </CardBoxItem>
    </>
  );
};


export default HelpCard;
