import styled from 'styled-components';
import { Col } from 'antd';
import { Colors, Fonts } from '../../../../theme';

export const TabContentDiv = styled.div`
  height: 490px;
  overflow: auto;
`;

export const ExecuteBtn = styled.div`
  width: 573px;
`;
export const StyledCol = styled(Col)`
  @media (max-width: 1924px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    max-width: 815px;
  }
`;

