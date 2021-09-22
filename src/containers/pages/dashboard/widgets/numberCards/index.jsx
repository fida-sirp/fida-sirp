import React from 'react';
import vulManage from '../../../../../assets//images/vulManage.png';
import {
  CardsView,
  CenterImage,
  StyledText,
  StyledNumber,
  LeftImage,
  BackCardsView,
  ItemText,
  ItemsNumber,
  StyledTitle
} from './StyledComponents';
import MultiColors from './MultiColor';

function NumberCards({ title, data, width, height }) {
    const isShowFirst = true;

    return (
      <div
        style={{ width, height }}
      >
        {isShowFirst ? (
          <CardsView
            background={MultiColors.gradientPurple}
            width={width}
            height={height}
          >
            <CenterImage src={vulManage} />
            <StyledText>Visits today</StyledText>
            <StyledNumber>3.2K</StyledNumber>
          </CardsView>
        ) : (
          <BackCardsView
            background={MultiColors.primaryGreen}
            width={width}
            height={height}
          >
            <StyledTitle>{title}</StyledTitle>
            <div
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: "5px"
              }}
            >
              <LeftImage src={vulManage} />
              <ItemText>Name of Item</ItemText>
              <ItemsNumber>2546</ItemsNumber>
            </div>
            <div
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <LeftImage src={vulManage} />
              <ItemText>Name of Item</ItemText>
              <ItemsNumber>2546</ItemsNumber>
            </div>
          </BackCardsView>
        )}
      </div>
    );
}

export default NumberCards
