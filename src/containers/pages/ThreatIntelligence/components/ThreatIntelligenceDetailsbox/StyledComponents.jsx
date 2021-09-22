import styled from 'styled-components';
import { Row, Divider, Image } from 'antd';
import { Colors, Fonts } from '../../../../../theme';

export const Container = styled.div`
color: ${Colors.primaryWhite};
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
overflow-y: auto;
border-radius: 5px;
width: 100%;
background-color: ${Colors.darkGray};
border-radius: 0px 0px 10px 10px;
padding: 20px 25px;
height: 80vh;
`;

export const ImagePDiv = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
`;

export const SImage = styled(Image)`
  padding: 5px;
`;

export const StyledDiv = styled.div`
  height: max-content;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-right: 100px;
`;

export const RowDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-right: 30px;
`;

export const StyledRow = styled(Row)`
  display: flex;
  align-items: center;
`;

export const Header = styled.div`
  border-radius: 10px 10px 0px 0px;
  height: 52px;
  // width: 1202px;
  display: flex;
  flex-direction: row;
  padding: 0px 24px;
  align-items: center;
  justify-content: space-around;
  background-color: ${Colors.backgroundGray};
`;

export const Separator = styled(Divider)`
  background-color: ${Colors.secondaryLightGray};
  margin: 10px;
`;

export const Text = styled.text`
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

export const Simg = styled.img`
  position: absolute;
  padding: 4px;
  right: 0;
  top: 4px;
`;

export const PRelativeDiv = styled.div`
  position: relative;
`;
