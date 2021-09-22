import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const StyledDiv = styled.div`
  padding: 5px 0px;
`;

export const ContentDiv = styled.div`
  background-color: ${Colors.backgroundSmokeBlack};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 5px 28px;
  margin-bottom: 25px;
  display:flex
`;

export const ContentDivLeft = styled.div`
 
  width:80%
`;

export const ContentDivRight = styled.div`
  padding:20px;
  width:20%
`;

export const HeaderDiv = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${Colors.backgroundGray};
  color: ${Colors.primarySmokeWhite};
  font-family: ${Fonts.type.robotoRegular};
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  padding-left: 28px;
  height: 46px;
  display: flex;
  align-items: center;
`;

export const StyledText = styled.text`
  color: ${Colors.primaryWhite};
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-style: normal;
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`;
