import React from 'react';
import PropTypes from 'prop-types';
import Search from '../../assets/svgIcon/search';
import { StyledDiv, StyledInput } from './StyledComponents';
import { Colors } from '../../theme';

function SPSearch({
  onChange,
  onEnter,
  text,
  size,
  placeholder,
  imageRight,
  themeColor,
}) {
  return (
    <StyledDiv themeColor={themeColor}>
      {!imageRight && <Search />}
      <StyledInput
        placeholder={placeholder ?? 'Search'}
        value={text}
        bordered={false}
        onPressEnter={onEnter}
        onChange={onChange}
        width={size}
        themeColor={themeColor}
      />

      {imageRight && <Search stroke={Colors.primaryWhite} />}
    </StyledDiv>
  );
}

export default SPSearch;

SPSearch.propTypes = {
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  text: PropTypes.string,
  size: PropTypes.string,
};
