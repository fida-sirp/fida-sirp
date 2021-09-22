import styled from 'styled-components';
import { Layout, Col, Row } from 'antd';
import { Colors, Fonts } from '../../../theme';

export const StyledLayout = styled(Layout)`
  background: ${Colors.backgroundSmokeBlack};
  border: 1px solid #44444f;
  color: ${Colors.primaryWhite};
  height: 58px;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
`;

export const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  font-family: ${Fonts.type.robotoRegular};
`;

export const StyledText = styled.text`
  margin-left: 10px;
  font-family: ${Fonts.type.robotoRegular} !important;
`;
export const StyledCol = styled(Col)`
  color: ${Colors.primaryWhite};
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;

  :hover {
    background-color: ${Colors.backgroundGray};
  }
`;
export const StyledRow = styled(Row)`
  height: 100%;
`;
