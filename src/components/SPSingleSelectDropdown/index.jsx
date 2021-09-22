import React, { useState } from 'react';
import { Dropdown } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { StyledMenu, StyledText, StyledDiv, IconDiv } from './StyledComponents';
import Ellipsis from '../../assets/svgIcon/ellipsis';
import {
  ArrowDiv,
  StyledPrimaryText,
} from '../SPMultiSelectDropdown/StyledComponents';
import UpArrowOutline from '../../assets/svgIcon/upArrowOutline';
import DownArrowOutline from '../../assets/svgIcon/downArrowOutline';
import { useEffect } from 'react';

function SPSingleSelectDropdown({
  title,
  items,
  onSelect,
  selectedItem,
  type,
  size,
  mode,
  disabled=false,
}) {
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
  }, []);
  const [selected, setSelected] = useState(selectedItem);
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    setVisible(false);
  };


  const onClick = key => {
    setSelected(key);
    onSelect(key);
    setVisible(!visible);
  };
  const menu = (
    <StyledMenu onClick={onClick} title={title}>
      {map(items, item => {
        return (
          <StyledMenu.Item key={item.key} onClick={item.onClickItem}>
            <IconDiv>{item.icon}</IconDiv>
            <StyledText>{item.label}</StyledText>
          </StyledMenu.Item>
        );
      })}
    </StyledMenu>
  );

  let element;
  if (title === 'more') {
    element = (
      <a>
        <Ellipsis />
      </a>
    );
  } else {
    element = (
      <StyledDiv type={type} size={size}>
        <StyledPrimaryText> {title} </StyledPrimaryText>
        {visible ? (
          <ArrowDiv>
            <UpArrowOutline />
          </ArrowDiv>
        ) : (
          <ArrowDiv>
            <DownArrowOutline />
          </ArrowDiv>
        )}
      </StyledDiv>
    );
  }

  return (
    <Dropdown
      getPopupContainer={trigger => trigger.parentNode.parentNode}
      visible={visible}
      disabled={disabled}
      overlay={menu}
      placement="bottomRight"
      trigger={['click']}
      onVisibleChange={() => {
        setVisible(!visible);
      }}
    >
      {element}
    </Dropdown>
  );
}

export default SPSingleSelectDropdown;

SPSingleSelectDropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  onSelect: PropTypes.func,
  selectedItem: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  mode: PropTypes.string,
  disabled:PropTypes.string,
};
