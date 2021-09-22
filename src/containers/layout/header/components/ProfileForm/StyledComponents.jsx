import styled from 'styled-components';
import { Divider, Row } from 'antd';
import { Colors, Fonts } from '../../../../../theme';

export const StyledDivider = styled(Divider)`
  background-color: ${Colors.secondaryLightGray};
`;

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 2px;
`;

export const PrimaryText = styled.text`
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: ${Colors.primaryWhite};
  margin-left: 5px;
`;

export const StyledGooglAuthBlock = styled.div`
  background: #373747;
  border-radius: 5px;
  margin-top:32px;
  padding:15px 21px;

`;

export const LabelTitleGoogleAuth = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #FFFFFF;
`;

export const InstructionsDiv = styled.div`
  padding-top:12px;
  padding-bottom:19px;
`;

export const InstructionLine = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #FFFFFF;
`

export const CenterImageDiv  = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
`;

export const BoxinputDiv = styled.div`
padding-right: 25px;
`;