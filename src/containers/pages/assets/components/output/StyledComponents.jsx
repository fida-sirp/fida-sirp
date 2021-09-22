import styled from 'styled-components';
import { Tree, Row } from 'antd';
import { Colors, Fonts } from '../../../../../theme';
import { JsonEditor as Editor } from 'jsoneditor-react';

export const StyleEditor = styled(Editor)`
  background-color: ${Colors.transparent};
  margin: 24px;
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  color: ${Colors.primaryWhite};
`;

export const StyledBox = styled.div`
  background: ${Colors.backgroundSmokeBlack};
  border-radius: 5px;
  width: 100%;
  flex-direction: column;
  border: 1px solid ${Colors.darkGray};
  height: 736px;
  min-height: 400px;
  padding-bottom: 4px;
  overflow: hidden;
`;

export const StyledHeader = styled.div`
  background-color: ${Colors.backgroundGray};
  height: 46px;
  padding: 13px 24px;
  display: flex;
`;

export const StyledText = styled.div`
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0px;
  color: ${Colors.primaryWhite};
  margin: 0px 5px;
`;

export const StyledSearchbar = styled(Row)`
  background: ${Colors.darkGray};
  padding: 5px;
  align-items: center;
  height: 50px;
`;
