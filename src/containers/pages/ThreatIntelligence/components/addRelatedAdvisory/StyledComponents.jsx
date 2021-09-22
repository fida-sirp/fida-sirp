import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const StyledBox = styled.div`
  width: 100%;
  display: flex;
  cursor: default;
  flex-direction: column;
  padding: 1.5rem;
  height: 40%;
  border-radius: 10px;
  background-color: ${Colors.darkGray};
  min-height: 260px;
  max-height: 410px;

  @media (max-width: 1924px) {
    width: 98%;
    height: 49%;
    margin-bottom: 0px;
    margin-right: 10px;
    max-width: 387px;
  }
`;

export const TagContainer = styled.div`
  width: inherit;
  flex: 1;
  height: inherit;
  overflow-y: auto;
`;

export const TagWrapper = styled.div`
  overflow-y: scroll;
  padding: 8px 0px;
  flex: 1;
  display: flex;
  // height: 400px;
  // @media (min-width: 1924px) {
  //   height: 200px;
  // }
`;

export const StyledText = styled.text`
  font-family: ${Fonts.type.robotoRegular};
  font-size: ${props => (props.fontSize ? props.fontSize : '15px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  color: ${Colors.primaryWhite};
`;
