import styled from 'styled-components';
import { Row, Col } from 'antd';
import { Colors, Fonts } from '../../theme';

export const AddDiv = styled.div`
  border-radius: 5px;
  background-color: ${Colors.backgroundSmokeBlack};
  color: ${Colors.primaryWhite};
  width: ${props => (props.width ? props.width + 'px' : 'max-content')};
  font-size: 15px;
  height: 38px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  cursor: pointer;
  padding: 0px 5px;
`;

export const StyledPlus = styled.div`
  border-radius: 3px;
  background-color: #2c2c38;
  color: ${Colors.primaryWhite};
  border: 1.5px solid ${Colors.primaryWhite};
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  margin: 5px;
  height: 24px;
  width: 25px;
`;
export const StyledRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center !important;
  margin: 5px 0px 20px 0px;
`;

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorDiv = styled.p`
  color: #fc5a5a;
  font-size: 13px;
  font-weight: 700;
  margin-left: 3px;
  margin-top: -20px;
  text-align: left;

  @media (max-width: 768px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 300px) {
    max-width: 122px;
  }
`;