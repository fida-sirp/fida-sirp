import { Tabs, List } from 'antd';
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';
import { Colors, Fonts } from '../../../../../theme';
import { Table } from 'antd';

const { TabPane } = Tabs;

import { JsonEditor as Editor } from 'jsoneditor-react';

export const StyleEditor = styled(Editor)`
  background-color: ${Colors.transparent};
  margin: 24px;
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  color: ${Colors.primaryWhite};
`;

export const StyledBox = styled.div`
  font-weight: 400;
  display: block;
  cursor: default;
  width: 100%;
  background-color: ${Colors.darkGray};
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledTab = styled(Tabs)`
  .ant-tabs-nav-wrap {
    padding-left: 30px;
  }
  .ant-tabs-content-holder {
    width: 100% !important;
  }
  .ant-tabs-nav {
    margin-bottom: 0px;
    background-color: #2c2c38 !important;
  }

  .ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-bottom > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before,
  .ant-tabs-bottom > div > .ant-tabs-nav::before {
    border: 1px solid #525268 !important;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    color: #ffffff;
  }

  .ant-tabs-tab .ant-tabs-tab-btn {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    color: #bdbdbd;
  }

  .ant-tabs-ink-bar {
    background: #ffffff;
    border-radius: 3px 3px 0px 0px;
    height: 5px !important;
  }

  .ant-tabs-content-holder {
    width: 100% !important;
  }
`;

export const StyleTabPane = styled(TabPane)``;

export const StyleFlex = styled.div`
  display: flex;
`;

export const TimeListMain = styled.div`
  width: 30%;
  border: 1px solid #525268;
  border-bottom: none;
  padding-top: 20px;
`;

export const DomainListMain = styled.div`
  width: 35%;
  padding-top: 25px;
  border: 1px solid #525268;
  border-bottom: none;
`;

export const ReportBox = styled.div`
  background: #1c1c24;
  padding-left: 8px;
  color: #fff !important;
  width: 80%
`;

export const ListStyle = styled(List)`
  .ant-list-item {
    border: none;
    padding-left: 4px;
    padding-right: 4px;
  }
  .ant-list-item:hover {
    background: #373747;
  }

  .ant-list-item.active {
    background: #373747;
  }
`;

export const RightOutlinedStyle = styled(RightOutlined)`
  color: #fff;
`;

export const ListLabelStyle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
  word-break: break-all;
`;

export const ReportTable = styled(Table)`
  float: left;
  width: 90%;
  padding-right: 20px;
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th {
    background: #2c2c38;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 22px;
    color: #ffffff;
  }

  td.ant-table-cell {
    background: #373747;
  }

  .cell1 {
    background: #2c2c38 !important;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 22px;
    color: #ffffff;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .cell2 {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 22px;
    color: #ffffff;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: #373747;
  }

  .ant-table {
    background: transparent;
    border-right: none;
  }

  .ant-table.ant-table-bordered > .ant-table-container {
    border: 1px solid #525268 !important;
  }

  .ant-table-cell {
    border: 1px solid #525268 !important;
  }
`;
