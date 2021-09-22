import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Dropdown } from 'antd';
import find from 'lodash/find';

import {
  StyledMenu,
  StyledText,
  StyledMainDiv,
  StyledArrowDiv,
} from './StyledComponents';
import DropDownArrow from '../../assets/svgIcon/dropdownArrow';
import './index.css';

function SPSelect({ items, selected, title, onChange, disabled, isDiagram = false }) {
  const menu = (
    <StyledMenu onClick={onChange}>
      {map(items, item => {
        return (
          <StyledMenu.Item key={item.key}>
            <StyledText>{item.value}</StyledText>
          </StyledMenu.Item>
        );
      })}
    </StyledMenu>
  );

  const selectedOption = find(items, { key: selected });

  return (
    <div>
      <Dropdown
        overlay={menu}
        getPopupContainer={trigger => trigger.parentNode.parentNode}
        placement="bottomLeft"
        trigger={['click']}
        disabled={disabled}
      >
        <StyledMainDiv isDiagram={isDiagram}>
          {!isDiagram ? (
            <>
              <StyledText>
                {title}
                {':    '}
                {selectedOption ? selectedOption.value : ''}
                {/* {selected} */}
              </StyledText>
              <StyledArrowDiv>
                <DropDownArrow />
              </StyledArrowDiv>
            </>
          ) : (
            <>
              <StyledText>
                {selectedOption ? selectedOption.value : ''}
              </StyledText>
              <StyledArrowDiv>
                <DropDownArrow />
              </StyledArrowDiv>
            </>
          )}
        </StyledMainDiv>
      </Dropdown>
    </div>
  );
}

export default SPSelect;

SPSelect.propTypes = {
  onChange: PropTypes.func,
  items: PropTypes.array,
  title: PropTypes.string,
  selected: PropTypes.string,
  isDiagram: PropTypes.bool,
};
