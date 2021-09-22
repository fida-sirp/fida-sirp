import React from 'react';
import { ChartTitle } from '../../StyledComponents';
import NoWidgetData from '../NoWidgetData';
import { TableWrapper } from './StyledComponents';

function TableListing({data, title, width, height}) {
    const updatedTableData = data?.table?.replaceAll('BASE_URL', location.host);

    return (
      updatedTableData ?(
      <TableWrapper id="tableWrapper" style={{ width:width, height:height }}>
      <ChartTitle>{title}</ChartTitle>
        <div dangerouslySetInnerHTML={{__html: updatedTableData}} />
      </TableWrapper>
      ): <NoWidgetData width={width} height={height} />
    );
}

export default TableListing
