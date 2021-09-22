import React, { useState, useEffect } from 'react';
import { Dropdown } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import { map, filter, includes, isEmpty, trim } from 'lodash';
import SPSearch from '../SPSearch';
import IncidentTab from '../../containers/pages/incidentManagement/components/incidentTab';
import {
  AddDiv,
  StyledPlus,
  StyledSearch,
  IncidentItem,
  StyledPlusIcon,
} from './StyledComponents';
import {
  StyledText,
  StyledMenu,
} from '../SPSingleSelectDropdown/StyledComponents';
import { StyledPrimaryText } from '../SPMultiSelectDropdown/StyledComponents';
import PlusIcon from '../../assets/svgIcon/plusIcon';
import { Colors } from '../../theme';

function SPAddItemDropdown({ title, items, onSelect, type, searchSize, icon, isProductList, plusButton, onSearchOnly }) {
  const [visible, setVisible] = useState(false);
  const [searchedItems, setSearchedItems] = useState(onSearchOnly ? [] : items);
  useEffect(() => {
    if (!onSearchOnly) {
      setSearchedItems(items);
    }
  }, [items]);
  const onClick = key => {
    onSelect(key);
    setVisible(!visible);
  };

  const menu = (
    <StyledMenu onClick={onClick} title={title} placement="bottomLeft">
      <StyledSearch key="searchBox" disabled>
        <SPSearch
          size={searchSize || '200px'}
          imageRight
          themeColor={Colors.primaryWhite}
          onChange={event => {
            setVisible(false);
            const input = trim(event?.target?.value);
            const searched = input?.length > 0 && filter(items, item => {
              let answer;
              answer = item?.label?.toUpperCase()
                .includes(event?.target?.value?.toUpperCase());

              if (!answer && item?.priority) {
                answer = item?.priority?.toUpperCase()
                  .includes(event?.target?.value?.toUpperCase());
              }
              if (!answer && item?.id) {
                answer = String(item.id).includes(String(event.target.value));
              }

              return answer;
            });
            setSearchedItems(searched);
          }}
        />
      </StyledSearch>

      {(type === 'member' || type === undefined || type === '') &&
        map(searchedItems, item => {
          return (
            <StyledMenu.Item key={item.key}>
              <StyledText>{isProductList && item?.label?.length > 15 ? item?.label?.substring(0, 35) + '..' : item?.label}</StyledText>
            </StyledMenu.Item>
          );
        })}

      {type === 'incident' &&
        map(searchedItems, (item, index) => {
          return (
            <IncidentItem key={item.key}>
              <IncidentTab
                text={item.label}
                id={item.id}
                priority={item.priority}
                noCancelIcon
                noBorder={index === searchedItems.length - 1}
              />
            </IncidentItem>
          );
        })}
    </StyledMenu>
  );

  return (
    <Dropdown
      overlay={menu}
      getPopupContainer={trigger => trigger.parentNode}
      placement="bottomRight"
      trigger={['click']}
      onVisibleChange={() => {
        setVisible(!visible);
      }}
    >
      {icon ? (
        <a>{icon}</a>
      ) : plusButton ? (
        <StyledPlusIcon>
          <PlusIcon />
        </StyledPlusIcon>
      ) : (
        <AddDiv>
          <StyledPrimaryText> {title} </StyledPrimaryText>
          <StyledPlus>
            <PlusIcon />
          </StyledPlus>
        </AddDiv>
      )}
    </Dropdown>
  );
}

export default SPAddItemDropdown;

SPAddItemDropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  onSelect: PropTypes.func,
  type: PropTypes.string,
  searchSize: PropTypes.string,
};
