import React from 'react';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import {StyledTable, StyledInput } from './StyledComponents';

function TableView({
  totalRecords,
  showingTill,
  columns,
  dataSource,
  canPaginate,
  currentPage,
  headerBorderColor,
  isLoading,
}) {
  function SkeletonTable() {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const table = arr.map(el => {
      return <StyledInput active={true} />;
    });
    return table;
  }

  return (
    <div>
      <StyledTable
        locale={{
          emptyText: isLoading ? <SkeletonTable /> : <div> No Data</div>,
        }}
        size="default"
        pagination={
          !isLoading
            ? canPaginate
              ? {
                  pageSize: showingTill,
                  position: ['bottomCenter'],
                  onChange,
                  current: currentPage,
                  total: totalRecords,
                }
              : false
            : false
        }
        headerBorderColor={headerBorderColor}
        columns={columns}
        dataSource={!isLoading ? dataSource : null}
      ></StyledTable>
    </div>
  );
}

export default TableView

TableView.propTypes = {
  totalRecords: PropTypes.number,
  currentShowing: PropTypes.number,
  showingTill: PropTypes.number,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  rowKey: PropTypes.string,
  canPaginate: PropTypes.bool,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number,
  noBottomPadding: PropTypes.bool,
  headerBorderColor: PropTypes.string,
  noTitle: PropTypes.bool,
  isLoading: PropTypes.bool,
};
