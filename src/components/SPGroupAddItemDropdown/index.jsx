import React, { useState, useEffect } from 'react';
import { Dropdown } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map, filter, includes, isEmpty, trim } from 'lodash';
import SPSearch from '../SPSearch';
import IncidentTab from '../../containers/pages/incidentManagement/components/incidentTab';
import {
  AddDiv,
  StyledPlus,

  StyledPlusIcon,
  StyledMenu
} from './StyledComponents';

import { StyledPrimaryText,  StyledText,
   } from '../SPMultiSelectDropdown/StyledComponents';
import PlusIcon from '../../assets/svgIcon/plusIcon';
import { Colors } from '../../theme';

 const StyledSearch = styled(StyledMenu.Item)`
  .ant-dropdown-menu-item-disabled,
  .ant-dropdown-menu-submenu-title-disabled {
    cursor: default !important;
  }
  background-color: ${Colors.backgroundSmokeBlack} !important ;
  margin: 5px 0px;
  justify-content: center;
`;

 const IncidentItem = styled(StyledMenu.Item)`
  width: 360;
  padding: 0px 20px;
`;



function SPGroupAddItemDropdown({ group,groupList, title, items, onSelect, type, searchSize, icon, isProductList, plusButton }) {
  const [visible, setVisible] = useState(false);
  const [searchedItems, setSearchedItems] = useState(items);
  useEffect(() => {
   
      setSearchedItems(items);
    
  }, [items]);
  const onClick = key => {
    console.log(key);
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
            if(input?.length){
                setSearchedItems(searched);
            }else{
                setSearchedItems(items);
            }
       
          }}
        />
      </StyledSearch>

      {console.log(searchedItems)}
    {group === true &&
      map(groupList, item => {
        return (
          <StyledMenu.ItemGroup title={item.groupName}>
            {searchedItems && 
              searchedItems?.filter(function(value){
                return  value.GroupLabel == item.groupName ;
              }).map((data) =>{
                return (
                  <StyledMenu.Item key={data.key}>
                  <StyledText>{isProductList && data?.label.length > 15 ? data?.label?.substring(0, 35) + '..' : data?.label}</StyledText>
                    </StyledMenu.Item>
                );
              })

            }
          </StyledMenu.ItemGroup> 
        );
      })
      
      
    }
      {(type === 'member' || type === undefined || type === '') && group == false &&
        map(searchedItems, item => {
          return (
            <StyledMenu.Item key={item.key}>
              <StyledText>{isProductList && item?.label.length > 15 ? item?.label?.substring(0, 35) + '..' : item?.label}</StyledText>
            </StyledMenu.Item>
          );
        })}

      {type === 'incident' && group == false && 
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

export default SPGroupAddItemDropdown;

SPGroupAddItemDropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  onSelect: PropTypes.func,
  type: PropTypes.string,
  searchSize: PropTypes.string,
};
