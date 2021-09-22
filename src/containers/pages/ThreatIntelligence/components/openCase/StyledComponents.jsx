import styled from 'styled-components';
import { Alert, Divider } from 'antd';
import { ErrorMessage } from 'formik'
import { Colors, Fonts } from '../../../../../theme';

export const StyledDiv = styled.div`
  padding: 5px 0px;
`;

export const ErrorMes = styled(ErrorMessage)`
  color:#fc5a5a;
  margin-right:10px;
`


export const StyledDivider = styled(Divider)`
  background-color: ${Colors.secondaryLightGray};
`;

export const Text = styled.text`
  font-family: ${Fonts.type.robotoBold};
  color: #ffffff;
  font-size: 20px;
  text-align: left;
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
