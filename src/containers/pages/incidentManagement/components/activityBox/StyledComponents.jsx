import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const Container = styled.div`
  color: ${Colors.primaryWhite};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  border-radius: 5px;
  flex: 1;
`;

export const StyledDiv = styled.div`
  display: flex;
  padding: 16px;
  width: 100%;
  background-color: ${Colors.darkGray};
  height: 536px;
  border-radius: 0px 0px 12px 12px;
`;

export const ActivityDiv = styled.div`
  border-radius: 3px;
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.secondaryTransparent};
  background-color: ${Colors.activityBackground};
  padding: 8px 15px;
  margin: 4px 0px;
`;

export const ActivityText = styled.text`
  font-family: ${props =>
    props.fontStyle === 'bold'
      ? Fonts.type.robotoBold
      : Fonts.type.robotoRegular};
  font-size: 15px;
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`;

export const TimeStamp = styled.text`
  font-family: Open Sans;
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 6px;
`;

export const Header = styled.div`
  border-radius: 10px 10px 0px 0px;
  color: ${Colors.primaryWhite};
  font-family: ${Fonts.type.robotoBold};
  font-size: 15px;
  line-height: 22px;
  font-weight: 700;
  letter-spacing: 0.05em;
  height: 52px;
  width: 100%;
  display: flex;
  padding: 0px 24px;
  align-items: center;
  background-color: ${Colors.backgroundGray};
`;
