import styled from 'styled-components';
import { Colors, Fonts } from '../../../../theme';

export const Container = styled.div`
  color: ${Colors.primaryWhite};
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  overflow-y: auto;
  border-radius: 5px;
`;

export const TitleStyledDiv = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  background-color: ${Colors.darkGray};
  border-radius: 10px;
  flex-direction: column;
`;

export const TitleText = styled.text`
  font-family: ${Fonts.type.robotoBold};
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 20px;
`;

export const TextStyle = styled.text`
  font-family: ${Fonts.type.roboto};
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`;

export const StyledDiv = styled.div`
  display: flex;
  padding: 16px;
  width: 388px;
  background-color: ${Colors.darkGray};
  height: 487px;
  border-radius: 0px 0px 10px 10px;
`;