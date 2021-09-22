import styled from 'styled-components';
import { Table, Skeleton } from 'antd';
import { Colors, Fonts } from '../../theme';

export const StyledTable = styled(Table)`
  .ant-table {
    background-color: ${Colors.transparent};
    color: ${Colors.primaryWhite};
    font-family: ${Fonts.type.robotoRegular} !important;
  }
  .ant-table-content {
    background-color: #2c2c38;
    color: ${Colors.primaryWhite};
    margin-bottom: 24px;
  }

  .ant-table-title {
    padding-left: 0px;
  }
  

  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background: ${Colors.backgroundGray};
  }

  td.ant-table-column-sort {
    background: #1c1c24;
  }
  .ant-table-thead {
    > tr > th {
      font-family: ${Fonts.type.robotoBold} !important;
      height: 46px !important;
      background-color: #1c1c24;
      color: ${Colors.primaryWhite};
      border-bottom: ${props =>
        props.headerBorderColor
          ? '3px solid' + props.headerBorderColor
          : 'none'};
      .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${Colors.primaryGreen};
      }
      .ant-checkbox-inner,
      .ant-checkbox-indeterminate .ant-checkbox-inner::after {
        background-color: ${Colors.transparent};
      }
    }
  }

  .ant-table-tbody {
    > tr > td {
      border-bottom: 1px solid ${Colors.backgroundGray};
      border: 1px solid ${Colors.backgroundGray};
      padding-top: ${props => (props.noBottomPadding ? '18px' : '25px')};
      padding-bottom: ${props => (props.noBottomPadding ? '17px' : '28px')};
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
    border-radius: 8px;
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
    border-radius: 8px;
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

  .ant-table-tbody > tr.ant-table-placeholder:hover > td,
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr.ant-table-row-selected > td {
    background-color: transparent;
  }

  .ant-table-selection {
    padding-left: 20px;
    padding-right: 20px;
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-inner,
  .ant-checkbox-checked::after {
    background-color: transparent;
    border-color: ${Colors.primaryWhite} !important;
  }
`;

export const StyledInput = styled(Skeleton.Input)`
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  display: flex;
  justify-content: center;
  padding: 10px;
  flex-direction: column;

  .ant-skeleton-input {
    height: ${props => (props.height ? props.height + 'px' : '40px')};
  }
`;
