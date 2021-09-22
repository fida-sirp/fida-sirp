import styled from 'styled-components';
import { Table, Skeleton } from 'antd';
import { Colors, Fonts } from '../../theme';

export const SMainBox = styled.div`
  display: block;
  background: #2c2c38;
`;

export const StyleSelectBox = styled.div`
  width: 300px;
  padding-bottom: 20px;
  margin-left: 23px;
`;

export const SPTable = styled(Table)`
  .ant-table {
    background-color: ${Colors.transparent};
    color: ${Colors.primaryWhite};
    font-family: ${Fonts.type.robotoRegular} !important;
  }
  .ant-table-content {
    background-color: #2c2c38;
    color: ${Colors.primaryWhite};
    border-radius: 0px;
    padding-bottom: ${props => (props.noBottomPadding ? '5px' : '50px')};
    margin-bottom: 24px;
  }

  .ant-table-title {
    padding-left: 0px;
  }
  .ant-table-container table > thead {
    tr:first-child {
      th:first-child {
        border-top-left-radius: 0px;
      }
      th:last-child {
        border-top-right-radius: 0px;
      }
    }
  }

  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background: ${Colors.backgroundGray};
  }

  td.ant-table-column-sort {
    background: #1c1c24;
  }
  .ant-table-thead {
    > tr > th {
      height: 46px !important;
      background-color: ${Colors.backgroundGray};
      color: ${Colors.primaryWhite};
      border-bottom: ${props =>
        props.headerBorderColor
          ? '3px solid' + props.headerBorderColor
          : 'none'};
    }
  }

  .ant-table-tbody {
    > tr > td {
      border-bottom: 1px solid #525268;
      padding-top: 11px;
      padding-bottom: 11px;
    }
    > tr::last-child > td {
      border-bottom: none;
    }
  }
  .ant-table-column-sorter {
    margin-top: -0.3em;
  }
  .ant-table-column-sorter-up.active,
  .ant-table-column-sorter-down.active {
    color: ${Colors.primaryGreen};
  }

  .ant-pagination-item {
    background-color: ${Colors.transparent};
    border-radius: 0px;
    border: 0px;
    > a,
    a:hover {
      color: ${Colors.offWhite};
    }
  }
  .ant-pagination-item-active {
    background-color: ${Colors.primaryGreen};
    > a,
    a:hover {
      color: white;
    }
  }
  .ant-pagination-item-link {
    border-radius: 0px;
    background-color: transparent;
    color: white;
    &:hover {
      color: ${Colors.primaryGreen};
      border-color: ${Colors.primaryGreen};
    }
  }

  .ant-pagination-item-ellipsis,
  .anticon-double-right,
  .anticon-double-left {
    color: ${Colors.offWhite} !important;
  }

  .ant-pagination-options {
    display: none;
  }
  .ant-table-pagination {
    padding: 16px;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background-color: transparent;
  }
  .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background-color: transparent;
  }
`;
