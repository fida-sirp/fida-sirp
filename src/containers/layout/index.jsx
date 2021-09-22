import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import { StyledContent, StyledLayout } from './StyledComponents';
import HeaderContainer from './header';
import SidebarContainer from './sidebar';

function LayoutContainer({ children }) {
  return (
    <Layout>
      <HeaderContainer />
      <StyledLayout>
        <SidebarContainer />
        <StyledContent>{children}</StyledContent>
      </StyledLayout>
    </Layout>
  );
}

LayoutContainer.propTypes = {
  children: PropTypes.node,
};

export default LayoutContainer;
