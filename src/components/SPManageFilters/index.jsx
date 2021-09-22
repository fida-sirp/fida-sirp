import React, { useState } from 'react';
import { Dropdown } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import includes from 'lodash/includes';
import UpArrowOutline from '../../assets/svgIcon/upArrowOutline';
import DownArrowOutline from '../../assets/svgIcon/downArrowOutline';
import FilterIcon from '../../assets/svgIcon/FilterIcon';
import CheckboxChecked from '../../assets/svgIcon/checkboxChecked';
import CheckboxUnChecked from '../../assets/svgIcon/checkboxUnchecked';
import {
  StyledMenu,
  StyledSmallDiv,
  StyledDiv,
  StyledPrimaryText,
  StyledSecondText,
} from './StyledComponents';

function SPManageFilters({ title, items, onChange, selectedItems }) {
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
            <StyledSmallDiv  >
              {selected ? <CheckboxChecked /> : <CheckboxUnChecked />}
              <StyledSecondText selected={selected}>
                {item.value}
              </StyledSecondText>
            </StyledSmallDiv>
          </div>
        );
      })}
    </StyledMenu>
  );

  return (
    <Dropdown
      getPopupContainer={trigger => trigger.parentNode}
      overlay={menu}
      placement="bottomLeft"
      trigger={['click']}
      onVisibleChange={() => {
        setVisible(!visible);
      }}
    >
      <StyledDiv>
        <FilterIcon />
        <StyledPrimaryText> {title || 'Manage Filters'} </StyledPrimaryText>
        {visible ? <UpArrowOutline /> : <DownArrowOutline />}
      </StyledDiv>
    </Dropdown>
  );
}

export default SPManageFilters;

SPManageFilters.propTypes = {
  items: PropTypes.array,
  selectedItems: PropTypes.array,
  onChange: PropTypes.func,
};
