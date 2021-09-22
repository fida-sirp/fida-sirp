import styled from 'styled-components';
import { Colors } from '../../../../../theme';
import { Col } from 'antd'



export const Container = styled.div`
  background-color: ${Colors.backgroundSmokeBlack};
  padding:30;
`;

export const Text = styled.h3`
    color: ${Colors.primaryWhite};
`;
export const CenterText = styled.h2`
    color: ${Colors.primaryWhite};
    text-align: center;
    font-weight: bold;
    border-radius: 5px;
`;
export const Mainbody = styled.div`
 margin-top: 20;
`
export const RoundCircle = styled.div`
    background: ${props => (props.color ? props.color : 'grey')};
    border-radius: 50%;
    height: 20px;
    width: 20px;
`;

export const ProgressChield = styled(Col)`
   width: ${props => `${props.width}%`};
`




