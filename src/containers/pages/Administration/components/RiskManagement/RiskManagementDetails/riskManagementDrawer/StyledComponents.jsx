
import { Alert } from 'antd';
import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../../../theme';

export const StyledDiv = styled.div`
  padding: 5px 0px;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentDiv = styled.div`
  background-color: ${Colors.backgroundSmokeBlack};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 5px 28px;
`;

export const HeaderDiv = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${Colors.backgroundGray};
  color: ${Colors.primarySmokeWhite};
  font-family: ${Fonts.type.robotoRegular};
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  padding-left: 28px;
  height: 46px;
  display: flex;
  align-items: center;
`;

export const StyledText = styled.text`
  color: ${Colors.primaryWhite};
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-style: normal;
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`;

export const AlertBox = styled(Alert)`
  display: flex;
  width: auto;
  margin: 0px auto;
  text-align: left;
  padding: 0;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
`;

export const LabelDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
`;

export const AddDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  height: 40px;
  background-color: #1C1C24;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-top: 20px;
  align-items: center;
`;

export const AssetDiv = styled.div`
  color: white;
  margin-left: 30px;
  margin-right: 20px;
  font-size: 15px;
`;

export const VulnerabilityDiv = styled.div`
  color: white;
  margin-left: 100px;
  font-size: 15px;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #ffffff;
  font-weight: 700;
  display: flex;
  margin-bottom: 15px;
`;
