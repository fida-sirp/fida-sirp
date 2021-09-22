import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  StyledText,
  StyledMenu,
  StyledSubMenu,
  StyledItem,
} from './StyledComponents';
import './index.css';
import { ContainerDiv, CancelButton } from '../UploadedItem/StyledComponents';
import { ArrowDiv } from '../SPMultiSelectDropdown/StyledComponents';
import CancelIcon from '../../assets/svgIcon/cancelIcon';
import UpArrowOutline from '../../assets/svgIcon/upArrowOutline';
import DownArrowOutline from '../../assets/svgIcon/downArrowOutline';

function SPMultilevelDropdown({
  name,
  icon,
  items,
  onSelect,
  onSelectTag,
  mode,
  onRemove,
  margin,
  opacity,
  tag,
  executeAction,
  inputName,
  placement,
  menuMode = 'vertical-right',
  showMenuOnWholeTagClick = false,
  checkAccess=true,
}) {
  const [visible, setVisible] = useState(false);

  const onClick = (key, item) => {
    onSelect(key, item);
    setVisible(!visible);
  };

  const subMenu = (label, items, itemDetails) => {
    return (
      <StyledSubMenu
     
        mode={menuMode}
        title={label}
       
        
        icon={
          menuMode === 'vertical-right' ? <LeftOutlined /> : <RightOutlined />
        }
      >
        {map(items, item => {
          return (
            <StyledItem
              key={item.subKey}
              onClick={() => onClick(item.subKey, item)}
              flexD="row"
            >
              <StyledText
                onClick={() => {
                  executeAction &&
                    executeAction({ itemDetails, item, inputName });
                }}
                paddingRight={15}
              >
                {item.subLabel}
              </StyledText>
            </StyledItem>
          );
        })}
      </StyledSubMenu>
    );
  };
  const menu = (
    <StyledMenu mode={menuMode}
  
    >
      {map(items, item => {
        let element;
        if (item.items.length > 0) {
          element = subMenu(item.label, item.items, item.details);
        } else {
          element = (
            <Menu.Item
              key={item.key}
              onClick={() => onClick(item.subKey, item)}
            >
              <StyledText>{item.label}</StyledText>
            </Menu.Item>
          );
        }
        return element;
      })}
    </StyledMenu>
  );

  let element;
  if (mode === 'tag') {
    element = (
      <ContainerDiv margin={margin} opacity={opacity}>
      {checkAccess ?
        <CancelButton
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
        >
          <CancelIcon />
        </CancelButton> :""}
        <StyledText
          paddingRight="10px"
          onClick={e => {
            if (!showMenuOnWholeTagClick) {
              e.preventDefault();
              e.stopPropagation();
            }
            onSelectTag();
          }}
        >
          {name}
        </StyledText>
        {visible ? (
          <ArrowDiv>
            <UpArrowOutline />
          </ArrowDiv>
        ) : (
          <ArrowDiv>
            <DownArrowOutline />
          </ArrowDiv>
        )}
      </ContainerDiv>
    );
  } else {
    element = <a>{icon}</a>;
  }

  return (
    <Dropdown
      overlay={menu}
      getPopupContainer={trigger => trigger.parentNode}
      placement={placement ?? 'bottomRight'}
      trigger={['click']}
      onVisibleChange={() => {
        setVisible(!visible);
      }}
    >
      {element}
    </Dropdown>
  );
}

export default SPMultilevelDropdown;

SPMultilevelDropdown.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
  onSelect: PropTypes.func,
  onSelectTag: PropTypes.func,
  onRemove: PropTypes.func,
  mode: PropTypes.string,
  margin: PropTypes.string,
  checkAccess: PropTypes.string,
};
