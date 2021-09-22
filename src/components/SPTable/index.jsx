import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import { StyledTable, ImgStyle, StyledInput } from './StyledComponents';

import loaderImg from '../../assets/images/loader.gif';

function SPTable({
  totalRecords,
  currentShowing,
  showingTill,
  columns,
  dataSource,
  rowKey,
  rowSelection,
  canPaginate,
  onPageChange,
  currentPage,
  noBottomPadding,
  headerBorderColor,
  noTitle,
  isLoading,
  handleTableChange,
  scrollable = true,
}) {
  const [selectedRowKeys, setselectedRowKeys] = useState();
  const upperBound =
    currentShowing + (showingTill - 1) > totalRecords
      ? totalRecords
      : currentShowing + (showingTill - 1);

  const tableTitle =
    'Showing: ' +
    currentShowing +
    ' - ' +
    +upperBound +
    ' from ' +
    totalRecords;

  const onChange = (page, pageSize) => {
    window.scroll(0, 0);
    if (onPageChange) {
      onPageChange(page, pageSize);
    }
  };
  const onSelectChange = selectedRowKeys => {
    console.log(selectedRowKeys);
    setselectedRowKeys(selectedRowKeys);
  };

  function SkeletonTable() {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const table = arr.map(el => {
      return <StyledInput active={true} />;
    });
    return table;
  }
  return (
    <StyledTable
      bordered={false}
      locale={{
        emptyText: isLoading ? <SkeletonTable /> : <div> No Data</div>,
      }}
      size="default"
      title={() =>
        !noTitle ? (
          !isLoading ? (
            tableTitle
          ) : (
            <StyledInput active={true} width={200} height={25} />
          )
        ) : null
      }
      rowKey={rowKey}
      onChange={handleTableChange}
      rowSelection={rowSelection}
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
      columns={columns}
      dataSource={!isLoading ? dataSource : null}
      scroll={scrollable ? { x: 'max-content' } : {}}
      headerBorderColor={headerBorderColor}
      noBottomPadding={noBottomPadding}
    />
  );
}

export default SPTable;

SPTable.propTypes = {
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
