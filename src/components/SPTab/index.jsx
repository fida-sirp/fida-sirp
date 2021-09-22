import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import {
  StyledTabs,
  StyledTabPane,
  MultiTabs,
  StyledTabPaneWithoutScroll,
} from './StyledComponents';

function SPTab({ tabs, onChange, mode, showScroll, height, defaultActiveKey }) {
  let element;
  if (mode === 'twoTabs') {
    element = (
      <StyledTabs onChange={onChange} type="card">
        {map(tabs, tab => {
          return showScroll ? (
            <StyledTabPane tab={tab.title} key={tab.key} >
              {tab.component}
            </StyledTabPane>
          ) : (
            <StyledTabPaneWithoutScroll tab={tab.title} key={tab.key} >
              {tab.component}
            </StyledTabPaneWithoutScroll>
          );
        })}
      </StyledTabs>
    );
  } else {
    element = (
      <MultiTabs
        height={height}
        onChange={onChange}
        defaultActiveKey={defaultActiveKey}
        type="card"
      >
        {map(tabs, tab => {
          return showScroll ? (
            <StyledTabPane tab={tab.title} key={tab.key}   height={600}>
              {tab.component}
            </StyledTabPane>
          ) : (
            <StyledTabPaneWithoutScroll tab={tab.title} key={tab.key}>
              {tab.component}
            </StyledTabPaneWithoutScroll>
          );
        })}
      </MultiTabs>
    );
  }
  return element;
}

export default SPTab;

SPTab.propTypes = {
  tabs: PropTypes.object,
  onChange: PropTypes.func,
  showScroll: PropTypes.bool,
};
SPTab.defaultProps = {
  showScroll: true,
};
