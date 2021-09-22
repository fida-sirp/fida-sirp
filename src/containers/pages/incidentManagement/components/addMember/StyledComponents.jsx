import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const StyledBox = styled.div`
  width: 100%;
  display: flex;
  cursor: default;
  flex-direction: column;
`;

export const TagContainer = styled.div`
  width: inherit;
  flex: 1;
  height: inherit;
  overflow-y: auto;
`;

export const TagWrapper = styled.div`
  padding: 8px 0px;
  flex: 1;
  display: flex;
  height: 415px;
  max-width: 340px;
  @media (min-width: 1924px) {
    height: 200px;
  }
`;

export const StyledText = styled.text`
  font-family: ${Fonts.type.robotoRegular};
  font-size: ${props => (props.fontSize ? props.fontSize : '15px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  color: ${Colors.primaryWhite};
`;
