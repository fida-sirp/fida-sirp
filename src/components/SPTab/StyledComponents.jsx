import styled from 'styled-components';
import { Tabs } from 'antd';
import { Colors, Fonts } from '../../theme';

const { TabPane } = Tabs;

export const StyledTabs = styled(Tabs)`

  color: ${Colors.primaryWhite};
  background-color: ${Colors.darkGray};
  border-radius: 10px;
  height: 57%;
  @media (max-width: 1924px) {
    width: 100%;
    height: 100%;
    margin-bottom: 0px;
    margin-left: 10px;
  }

  .ant-tabs-content-holder {
    width: 1058px !important;
    padding: 19px 30px;
  }

  .ant-tabs-nav {
    background-color: ${Colors.backgroundSmokeBlack} !important;
  }
  .ant-tabs-tab {
    background: transparent !important;
    border: none !important;
    height: 52px;
    width: 211px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${Fonts.type.robotoRegular};
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0px;
    color: ${Colors.primaryWhite} !important;
    > .ant-tabs-tab-btn {
      color: #ffffff80;
    }
  }
  .ant-tabs-tab-active {
    background-color: ${Colors.darkGray} !important ;
    width: 176px !important;
    font-family: ${Fonts.type.robotoBold};
    font-weight: 700;
    > .ant-tabs-tab-btn {
      color: ${Colors.primaryWhite};
    }
  }

  .ant-tabs-nav-wrap,
  .ant-tabs-nav::before {
    border: none !important;
  }
`;

export const MultiTabs = styled(Tabs)`
  color: ${Colors.primaryWhite} !important;
  background-color: ${Colors.backgroundSmokeBlack};
  height: ${props => `${props.height && props.height}px`};
  border-radius: 10px;
  min-height: 540px;

  .ant-tabs-content-holder {
    // width: 1200px !important;
    background-color: ${Colors.darkGray};
  }

  .ant-tabs-nav {
    background-color: ${Colors.backgroundSmokeBlack};
  }

  .ant-tabs-tab {
    background-color: transparent !important;
    height: 49px;
    border: none !important;
    border-bottom: 1px solid #525268 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${Fonts.type.robotoRegular};
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0px;
    color: ${Colors.primaryWhite} !important;
    > .ant-tabs-tab-btn {
      color: #ffffff80;
    }
    min-width: 115px;
  }
  .ant-tabs-tab-active {
    background-color: ${Colors.darkGray} !important ;
    font-family: ${Fonts.type.robotoBold};
    font-weight: 700;
    > .ant-tabs-tab-btn {
      color: ${Colors.primaryWhite};
    }
  }

  .ant-tabs-nav-wrap,
  .ant-tabs-nav {
    margin-bottom: 0px;
    &:before {
      border-bottom: 1px solid #525268;
    }
  }
`;

export const StyledTabPane = styled(TabPane)`
  height: ${props => `${props.height && props.height}px`};
  overflow: auto;
`;

export const StyledTabPaneWithoutScroll = styled(TabPane)`
  height: 485px;
`;
