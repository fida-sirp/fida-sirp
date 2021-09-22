import styled from 'styled-components';
import { Col, List } from 'antd';
import { RightOutlined } from '@ant-design/icons';

export const TabContentDiv = styled.div`
  height: 490px;
  overflow: auto;
`;

export const ExecuteBtn = styled.div`
  width: 573px;
`;

export const AdministrationTab = styled.div`
  width: 100%;
`;

export const StyledCol = styled(Col)`
  @media (max-width: 1924px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    max-width: 815px;
  }
`;

export const ListStyle = styled(List)`
  width: 140px;
  border-right: 1px solid #525268;
  height: 100%;
  .ant-list-item {
    border: none;
    padding-left: 20px;
    padding-right: 20px;
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
  font-weight: 700;
  font-size: 13px;
  line-height: 22px;
  color: ${props =>
    props.selectedItem === props.selectedSubTab ? 'white' : '#BDBDBD'};
  cursor: pointer;
`;

export const AdministrationTabContainer = styled.div`
  display: flex;
`;

export const administrationTabDetails = styled.div`
  margin: 30px;
`;

export const administrationTabDetailsTable = styled.div`
  margin: 100px;
  display: flex;
  align-item: center;
`;
