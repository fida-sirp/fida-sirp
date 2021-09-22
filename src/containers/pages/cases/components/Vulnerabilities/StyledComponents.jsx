import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const StyledBox = styled.div`
  border-radius: 10px;
  width: auto;
  background-color: ${Colors.darkGray};
  max-height: inherit;
`;

export const StyledDiv = styled.div`
  width: max-content;
  padding: 10px;
`;

export const StyledModalTitle = styled.h2`
  margin-top: 14px;
  margin-bottom: 0;
  color: #fff;
  border: 1px solid #525268;
  padding: 8px;
  text-align: center;
  background: #2c2c38;
`;

export const StyledModalSubTitle = styled.h2`
  text-align: center;
  color: #fff;
  border: 1px solid #525268;
  padding: 8px;
  margin: 0;
  background: #2c2c38;
`;

export const StyledModalSubValue = styled.h2`
  text-align: center;
  color: #fff;
  border: 1px solid #525268;
  padding: 8px;
  margin: 0;
`;
