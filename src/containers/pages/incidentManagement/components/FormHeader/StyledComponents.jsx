import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const StyledBox = styled.div`
  border-radius: 5px;
  font-weight: 500;
  font-family: ${Fonts.type.robotoBold};
  font-size: 15px;
  color: ${Colors.primaryWhite};
  height: 52px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: ${Colors.backgroundGray};
  margin: 24px 0px;
  padding: 0px 20px;
`;

export const Container = styled.div`
  align-items: center;
  flex-direction: column;
`;

export const EditBox = styled.div`
  display: flex;
  width: 67px;
  height: 32px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.backgroundGray};
`;

export const ArrowDiv = styled.div`
  align-items: center;
  display: flex;
  height: 13px;
  width: 13px;
`;
