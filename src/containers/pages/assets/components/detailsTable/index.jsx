import React from 'react';

import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import SPRoundProgress from '../../../../../components/SPRoundProgress';
import {
  ContentDiv,
  HeaderDiv,
  StyledText,
  StyledDiv,
  ContentDivRight,
  ContentDivLeft
} from './StyledComponents';

function DetailsTable({ items, values,ast_s3_score,assetTypeSingleData,singleOwnerData, dashboardData }) {
  let s3Score = 0;
  if (ast_s3_score) {
    s3Score = ast_s3_score;
  }
 
  return (
    <div>
      <HeaderDiv>ASSETS DETAILS</HeaderDiv>
      <ContentDiv>
        <ContentDivLeft>
          {map(items, item => {
              let valueData =values[item.key];
             
            if (item.data === "assetTypes"){
              if(assetTypeSingleData){
                valueData = assetTypeSingleData.data?.aty_name;
              }
            }
            if(item.data === "owner"){
              singleOwnerData
              if(singleOwnerData){
                valueData = singleOwnerData.data?.usr_name;
              }
            }
            if(item.data === "dashboardData" && dashboardData !== null){
              let keys= Object.keys(dashboardData.data[item.key])[0];
              valueData = dashboardData.data[item.key][keys];

            }
            return (
              <StyledDiv>
                <StyledText fontWeight="700">{item.label}:</StyledText>{' '}
                <StyledText>{valueData}</StyledText>
              </StyledDiv>
            );
          })}
        </ContentDivLeft>
        <ContentDivRight>
        <SPRoundProgress type="success" progress={s3Score} width="120" />
        </ContentDivRight>
      </ContentDiv>
    </div>
  );
}

export default DetailsTable;

DetailsTable.propTypes = {
  items: PropTypes.array,
};
