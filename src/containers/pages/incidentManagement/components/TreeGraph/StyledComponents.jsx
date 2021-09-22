import { Tabs, List } from 'antd';
import styled from 'styled-components';
import {
  RightOutlined
} from '@ant-design/icons';
import { Colors, Fonts } from '../../../../../theme';
import { Table } from 'antd';


const { TabPane } = Tabs;

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
  .ant-tabs-nav-wrap{
    padding-left: 30px;
  }

  .ant-tabs-nav{
    margin-bottom:0px;
    background-color: #2C2C38 !important;
  }



  .ant-tabs-top > .ant-tabs-nav::before, .ant-tabs-bottom > .ant-tabs-nav::before, .ant-tabs-top > div > .ant-tabs-nav::before, .ant-tabs-bottom > div > .ant-tabs-nav::before {
    border: 1px solid #525268!important;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    color: #FFFFFF;
  }

  .ant-tabs-tab .ant-tabs-tab-btn{
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    color: #BDBDBD;
  }

 

  .ant-tabs-ink-bar {
   
    background: #FFFFFF;
    border-radius: 3px 3px 0px 0px;
    height: 5px!important;
  }

`;

export const StyleTabPane =  styled(TabPane)`


`


export const StyleFlex = styled.div`
  display:flex;

`;

export const TimeListMain = styled.div`
  width:20%;
  border: 1px solid #525268;
  border-bottom:none;
  padding-top: 20px;

`;

export const DomainListMain = styled.div`
  width:15%;
  padding-top: 25px;
  border: 1px solid #525268;
  border-bottom:none;
`;

export const ReportBox = styled.div`
  width:65%;
  background: #1C1C24;
  padding-left: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  display:flex;
  padding-right: 10px;
`;

export const ListStyle =  styled(List)`
  .ant-list-item{
    border:none;
    padding-left: 30px;
    padding-right: 30px;
  }
  .ant-list-item:hover {
      background: #373747;
  }

  .ant-list-item.active {
    background: #373747;
  }
`;

export const RightOutlinedStyle =  styled(RightOutlined)`
color: #fff;
`;


export const ListLabelStyle =  styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #FFFFFF;
`;

export const ReportTable =styled(Table)`
  float: left;
  width: 90%;
  padding-right: 20px;
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > thead > tr > th{
    background: #2C2C38;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 22px;
    color:#FFFFFF
  }
  

  td.ant-table-cell{
    background: #373747;
  }
  
  .cell1{
    background: #2C2C38!important;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 22px;
    color:#FFFFFF;
    text-align:center;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .cell2{
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 22px;
    color: #FFFFFF;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td{
    background: #373747;
  }

  .ant-table{
    background: transparent;
    border-right: none;
  }

  .ant-table.ant-table-bordered > .ant-table-container{
    border: 1px solid #525268!important;
  }

  .ant-table-cell{
    border: 1px solid #525268!important;
  }

`