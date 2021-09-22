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
  padding-bottom: 70px;
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
  width: 100%;
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

export const Wrapper = styled.div`
  height: calc(80vh);
  overflow: hidden;
  padding-bottom: 12px;
`;
