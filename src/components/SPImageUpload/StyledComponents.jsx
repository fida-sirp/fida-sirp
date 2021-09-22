import styled from 'styled-components';
import { Upload, Image } from 'antd';
import { Colors } from '../../theme';

export const LabelDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #ffffff;
  font-weight: 700;
  display: flex;
  margin-bottom: 15px;
`;

export const StyledInput = styled.input`
  justify-content: center;
  display: flex;
  align-items: center;
`;
export const StyledImage = styled.img`
  height: 160px;
  width: 160px;
  border-radius: 100px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  width: 160px;
  border-radius: 100px;
  background-color: ${Colors.backgroundSmokeBlack};
  margin: 10px;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
`;

export const StyledLabel = styled.label`
  height: 32px;
  background-color: ${Colors.primaryGreen};
  width: 155px;
  border-radius: 5px;
  padding: 5px 12px;
  display: flex;
  align-items: center;
  margin: 10px;
  justify-content: center;
`;
