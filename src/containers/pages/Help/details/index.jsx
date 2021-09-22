import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { singleHelp } from '../../../../actions/help';
import { StyledDiv, StyledText, StyledButton, StyleBodyDiv, InsideDivBox } from './StyledComponents';
import BackArrowOutline from '../../../../assets/svgIcon/backArrowOutline';
import SetDocumentTitleHOC from '../../../../HOCs/SetDocumentTitleHOC';
import SPRiskTag from '../../../../components/SPRiskTag';
import './index.css'

const Helpdetails = ({singleHelp,singleData}) => {
  const history = useHistory();
  const id = location.pathname.split('/').pop();
  useEffect(() => {
    singleHelp(id);
  }, []);
  return (
    <>
       <StyledDiv>
          <StyledButton
            onClick={() => {
              history.goBack();
            }}
          >
            <BackArrowOutline />
          </StyledButton>
          <StyledText>Help Center</StyledText>
        </StyledDiv>

        <StyleBodyDiv>
            <InsideDivBox>
                <div className="help-title-name">
                    {singleData?.data?.shp_name}
                </div>     
                <div className="help-desc-name"  dangerouslySetInnerHTML={{
    __html: singleData?.data?.shp_long_description
  }}>
               
                </div> 
               {/*  <ol className="help-order-list">
                    <li> Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit</li>
                    <li> Non proident, sunt in culpa qui officia deserunt mollit</li>
                    <li> Cupidatat non proident, su</li>
                    <li> Culpa qui officia deserunt mollit </li>
                    <li> Officia deserunt mollit</li>
                </ol> 
                <div className="video-block">
                    <iframe title="test" width="695" height="390" src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>
                </div>

          */}
            </InsideDivBox>
            {/*  <div className="border-line"></div>
            <InsideDivBox>
                <div className="help-title-name">
                    How to create a dashboard? 
                </div>   
                <div className="help-desc-name" >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div> 
      
            </InsideDivBox>
                */}
        </StyleBodyDiv>
   
     
    </>
  );
};



const mapStateToProps = state => {
  return {
    singleData: state.helpStore.singleData,
    loading: state.helpStore.loading,
  };
};

const mapDispatchToProps = {
  singleHelp
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
)(Helpdetails);