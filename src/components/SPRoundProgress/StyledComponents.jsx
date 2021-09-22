import styled from 'styled-components';
import { Progress } from 'antd';
import { Colors } from '../../theme';

const StyledProgress = styled(Progress)`
  cursor: pointer;
  .ant-progress-text {
    color: ${Colors.primaryWhite} !important;
    font-size: ${props => (props.fontSize ? props.fontSize : '15px')};
    font-weight: 400;
  }
  .ant-progress-circle-trail {
    stroke: ${props =>
      props.backColor ? props.backColor : Colors.primaryWhite};
  }
`;

export default StyledProgress;
