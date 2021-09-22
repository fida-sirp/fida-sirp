import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const ContainerDiv = styled.div`
  padding-right: 20px;
  padding-bottom: 20px;
`;

export const Container = styled.div`
  color: ${Colors.primaryWhite};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px; 
  height: 100%;
  width: 100%;
  position: relative;
`;

export const StyledDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  width: 250px;
  background-color: ${props => (props.selected ? '#525268' : Colors.darkGray)};
  height: 280px;
  border-radius: 10px;
   &:hover,
  &:focus {
    background: ${Colors.backgroundGray} !important;
    border-color: ${Colors.backgroundGray} !important;
`;

export const SubjectText = styled.text`
  font-family: ${props =>
    props.fontStyle === 'bold'
      ? Fonts.type.robotoBold
      : Fonts.type.robotoRegular};
  font-size: 15px;

  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  line-height: 22px;
  letter-spacing: 0px;
  width: 100%;
  text-align: ${props => (props.center ? 'center' : 'left')};
  padding-bottom: ${props => (props.bottomPadding ? '10px' : '0px')};
`;

export const DetailsText = styled.text`
  font-family: ${props =>
    props.fontStyle === 'bold'
      ? Fonts.type.robotoBold
      : Fonts.type.robotoRegular};
  font-size: 15px;
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  line-height: 22px;
  overflow-y: auto;
  height: 105px;
  width: 100%;
  letter-spacing: 0px;

  text-align: ${props => (props.center ? 'center' : 'left')};
  padding-bottom: ${props => (props.bottomPadding ? '10px' : '0px')};
  color: #BDBDBD;
`;

export const TitleText = styled.text`
  font-family: ${props =>
    props.fontStyle === 'bold'
      ? Fonts.type.robotoBold
      : Fonts.type.robotoRegular};
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`;

export const TimeStamp = styled.text`
  font-size: 13px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`;

export const IconImage = styled.img`
  width: 40px;
  height: 40px;
  display: flex;
  margin-right: 15px;
`;

export const AddIconImage = styled.img`
  width: 35px;
  height: 35px;
  display: flex;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-bottom: 15px;
`;

export const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const AddDiv = styled.div`
  display: flex;
  background-color: ${Colors.activityBackground};
  padding: 30px;
  cursor: pointer;
  border-radius: 50%;
  margin-bottom: 30px;
  &:hover,
  &:focus {
    background: ${Colors.secondaryLightGray} !important;
    border-color: ${Colors.secondaryLightGray} !important;
  }
`;

export const MoreOptionsDiv = styled.div`
 display: flex;
 justify-content: center;
 padding: 10px;
 `;

 export const IconsWraper = styled.div`
 padding: 3px;
 margin-right: 6px;
 border-radius: 2px;
 border: 1px solid;
 &:hover {
   background-color: #33C758;
   border: 1px solid #33C758;
   cursor: pointer;
 }

 &:hover > .star-icon{
   color:#FFF !important;
 }
 `;

 export const SetDefaultIcon = styled.img`
 width: 20px;
 `;

 export const CardOverlay = styled.div`
 position: absolute;
 z-index:3;
 bottom:0;
 `;
