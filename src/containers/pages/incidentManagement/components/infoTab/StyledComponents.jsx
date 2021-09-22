import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const Container = styled.div`
  color: ${Colors.primaryWhite};

  background-color: ${Colors.transparent};
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-weight: 400;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${props =>
    props.type === 'vertical' &&
    `flex-direction:column;
     align-items: flex-start;
    `};
`;

export const TabText = styled.text`
  font-family: ${Fonts.type.robotoBold};
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
