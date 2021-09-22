import styled from 'styled-components';
import { Row, Col } from 'antd';
import { Colors, Fonts } from '../../../../../theme';

export const Container = styled.div`
  display: flex;
  height: 485px;
  overflow: auto;
  background-color: ${Colors.darkGray};
  width: 100%;
  flex-direction: column;
  padding: 14px 62px;
`;

export const StyledRow = styled(Row)``;

export const StyledCol = styled(Col)`
  display: flex;
  height: 96px;
  border: 1px solid ${Colors.secondaryLightGray};
  background-color: ${Colors.backgroundSmokeBlack};
  justify-content: space-between;
`;

export const TitleDiv = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
export const StyledText = styled.text`
  font-family: ${Fonts.type.robotoBold};
  color: ${Colors.primaryWhite};
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: center;
`;

export const MenuDiv = styled.div`
  width: 30px;
  flex-direction: column;
  display: flex;
  align-items: flex-end;
  height: 100%;
  padding: 3px;
  align-self: flex-end;
`;
export const MultipleDiv = styled.div`
  width: 30px;
  flex-direction: column-reverse;
  display: flex;
  height: 100%;
  padding: 3px;
  align-self: flex-end;
`;

export const TagContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  max-width: fit-content;
  overflow-y: auto;
`;

export const EvidenceTableWrapper = styled.div`
  width: 100% !important;
`;

export const TagWrapper = styled.div`
  padding: 8px 13px;
  flex: 1;
  display: flex;
`;

export const IconDiv = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 3px;
  background-color: ${Colors.secondaryLightGray};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  cursor: pointer;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ExecuteBtn = styled.div`
  width: 573px;
`;
