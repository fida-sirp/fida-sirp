import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { isNumber, isString } from 'lodash';
import NoWidgetData from '../NoWidgetData';
import { Container, TableWrapper, PieChartWrapper } from './StyledComponents';
import { ChartTitle } from './../../StyledComponents';

function PieChartTable({ data, title, height, width }) {
  const [controls, setControls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState('');
  const [hasData, setHasData] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setControls([]);
  }, [width, height]);

  useEffect(() => {
    let hasData = false;;
    const pieData = data?.pie?.[0] || [];

    if (pieData?.data?.length > 0) {
      let count = 0;
      const chartDetails = pieData;
      const chartKeys = pieData?.data ? Object.keys(pieData.data) : [];
      const mergedData = [['Element', 'Numbers', { role: 'style' }]];
      chartKeys.forEach((item, index) => {
        if (
          isString(chartDetails.label[index]) &&
          isNumber(Number(chartDetails.data[index])) &&
          isString(chartDetails.backgroundColor[index])
        ) {
          count += Number(chartDetails.data[index]);
          mergedData.push([
            chartDetails.label[index],
            Number(chartDetails.data[index]),
            chartDetails.backgroundColor[index],
          ]);
        }
      });
      setCount(count);
      setChartData(mergedData);
      hasData = count > 0;
    }

    if (data?.table?.data?.length > 0) {
      const tableData =
        data.table.data.replaceAll('BASE_URL', location.host);
      setTableData(tableData);
      hasData = tableData.length > 0;
    }

    setHasData(hasData);
  }, []);

  return (
    <Container
      style={{
        width,
        height,
      }}
    >
      {hasData ? (
        <>
          <ChartTitle>{title}</ChartTitle>
          <PieChartWrapper>
            {chartData && count > 0 ? (
              <Chart
                width={width / 2}
                height={height - 40}
                controls={controls}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                  sliceVisibilityThreshold: 0.2,
                  slices: [
                    { color: '#1E75FF' },
                    { color: '#FC5A5A' },
                    { color: '#33C758' },
                  ],
                  title,
                  backgroundColor: '#1C1C24',
                  titleTextStyle: {
                    color: '#fff',
                    textAnchor: 'start',
                    fontFamily: 'Arial',
                    fontSize: 15.5,
                    fontWeight: 'bold',
                    stroke: 'none',
                    strokeWidth: 0,
                 },
                  chartArea: { width: '90%' },
                  pieHole: 0.8,
                  pieSliceBorderColor: '#1C1C24',
                  pieSliceText: 'none',
                  legend: {
                    position: 'bottom',
                    textStyle: {
                      color: '#FFFFFF',
                    },
                  },
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            ) : (
              <NoWidgetData width={width / 2} height={height - 40} />
            )}
            <TableWrapper
              width={width / 2}
              height={height - 40}
            >
              <div dangerouslySetInnerHTML={{ __html: tableData }} />
            </TableWrapper>
          </PieChartWrapper>
        </>
      ) : <NoWidgetData width={width / 2} height={height} />}
    </Container>
  );
}

export default PieChartTable;
