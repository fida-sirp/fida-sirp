import styled from 'styled-components';
import { Colors, Fonts } from '../../theme';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const LabelDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #ffffff;
  font-weight: 700;
  display: flex;
  margin-bottom: 10px;
  margin-left: 5px;
`;

export const TextAreaView = styled.div`
  font-size: 15px;
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  height: ${props => (props.height ? props.height : 'max-content')};
  outline: none;
  text-align: left;
  background-color: #1c1c24;
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 20px;
`;
