import React, { useState } from 'react';
import { Dropdown } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import includes from 'lodash/includes';
import UpArrowOutline from '../../assets/svgIcon/upArrowOutline';
import DownArrowOutline from '../../assets/svgIcon/downArrowOutline';
import CheckboxChecked from '../../assets/svgIcon/checkboxChecked';
import CheckboxUnChecked from '../../assets/svgIcon/checkboxUnchecked';
import {
  StyledMenu,
  StyledSmallDiv,
  StyledDiv,
  StyledPrimaryText,
  StyledSecondText,
  ArrowDiv,
  IconDiv,
} from './StyledComponents';

function SPMultiSelectDropdown({
  items,
  onChange,
  selectedItems,
  title,
  placement,
  borderColor,
  dropIcon,
  onMenuClose,
  height,
  labelKey = 'value',
  disabled=false,
}) {
  console.log({ items });
  const [visible, setVisible] = useState(false);
  const menu = (
    <StyledMenu>
      {map(items, item => {
        const selected = includes(selectedItems, item.key);
        return (
          <div
            key={item.key}
            onClick={() => {
              onChange(item.key, selected);
            }}
            role="presentation"
          >
            <StyledSmallDiv>
              {selected ? <CheckboxChecked /> : <CheckboxUnChecked />}
              <StyledSecondText selected={selected}>
                {item?.[labelKey]}
              </StyledSecondText>
            </StyledSmallDiv>
          </div>
        );
      })}
    </StyledMenu>
  );
  const arrowIcon = visible ? (
    <ArrowDiv>
      <UpArrowOutline />
    </ArrowDiv>
  ) : (
    <ArrowDiv>
      <DownArrowOutline />
    </ArrowDiv>
  );

  const customIcon = <IconDiv height={height}>{dropIcon}</IconDiv>;
  return (
    <Dropdown
      overlay={menu}
      placement={placement || 'bottomLeft'}
      trigger={['click']}
      onVisibleChange={() => {
        setVisible(!visible);
        if (visible) {
          onMenuClose(false);
        }
      }}
      disabled={disabled}
    >
      <StyledDiv borderColor={borderColor} height={height}>
        <StyledPrimaryText> {title} </StyledPrimaryText>
        {dropIcon ? customIcon : arrowIcon}
      </StyledDiv>
    </Dropdown>
  );
}

export default SPMultiSelectDropdown;

SPMultiSelectDropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  selectedItems: PropTypes.array,
  onChange: PropTypes.func,
  placement: PropTypes.string,
  borderColor: PropTypes.string,
  onMenuClose: PropTypes.func,
  height: PropTypes.string,
  disabled: PropTypes.string,
};
