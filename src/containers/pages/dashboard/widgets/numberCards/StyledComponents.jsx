import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const CardsView = styled.div`
  display: flex;
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => (props.background ? props.background : '' )};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const BackCardsView = styled.div`
  display: flex;
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => (props.background ? props.background : '')};
  border-radius: 10px;
  justify-content: center;
  align-items: left;
  flex-direction: column;
`;

export const StyledTitle = styled.text`
  font-size: 18px;
  font-weight: 700;
  margin-left: 10px;
  margin-bottom: 20px;
  font-family: ${Fonts.type.robotoRegular};
  color: ${Colors.primaryWhite} !important;
`;

export const CenterImage = styled.img`
  width: 40px;
  height: 40px;
  display: flex;
  margin-bottom: 16px;
`;

export const LeftImage = styled.img`
  width: 25px;
  height: 25px;
  display: flex;
`;

export const StyledText = styled.text`
  font-size: 18px;
  font-weight: 400;
  font-family: ${Fonts.type.robotoRegular};
  color: ${Colors.primaryWhite} !important;
`;

export const ItemText = styled.text`
  font-size: 13px;
  font-weight: 400;
  font-family: ${Fonts.type.robotoRegular};
  color: ${Colors.primaryWhite} !important;
`;

export const ItemsNumber = styled.text`
  font-size: 15px;
  font-weight: 700;
  font-family: ${Fonts.type.robotoRegular};
  color: ${Colors.primaryWhite} !important;
`;

export const StyledNumber = styled.text`
  font-size: 20px;
  font-weight: 700;
  font-family: ${Fonts.type.robotoRegular};
  color: ${Colors.primaryWhite} !important;
`;
