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
  overflow-y: auto;
  border-radius: 5px;
`;

export const StyledDiv = styled.div`
  display: flex;
  padding: 20px;
  width: 250px;
  background-color: ${props => (props.selected ? '#525268' : Colors.darkGray)};
  height: 280px;
  border-radius: 10px;
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
  letter-spacing: 0px;
  text-align: ${props => (props.center ? 'center' : 'left')};
  padding-bottom: ${props => (props.bottomPadding ? '10px' : '0px')};
  color: #bdbdbd;
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
`;

export const BackArrowDiv = styled.div`
  padding-right: 20px;
  margin-bottom: 9px;
  cursor:pointer;
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
  border-radius: 50%;
  margin-bottom: 30px;
  &:hover,
  &:focus {
    background: ${Colors.backgroundGray} !important;
    border-color: ${Colors.backgroundGray} !important;
  }
`;
