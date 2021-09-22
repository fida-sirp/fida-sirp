import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { isNumber, isString } from 'lodash';
import NoWidgetData from '../NoWidgetData';

function DoughnutChart({ data, title, width, height }) {

  const [fakeControls, setFakeControls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setFakeControls([]);
  }, [width, height]);

  useEffect(() => {
    if (data && data.length > 0) {
      let count = 0;
      const chartDetails = data[0];
      const chartKeys = data[0]?.data ? Object.keys(data[0].data) : [];
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
    }
  }, []);

  return (
    chartData && count > 0 ? <Chart
      width={width}
      height={height}
      controls={fakeControls}
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
        // sliceVisibilityThreshold: 0.2,
        legend: {
          position: 'bottom',
          textStyle: {
            color: '#FFFFFF',
          },
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    /> : <NoWidgetData width={width} height={height} />

  );
}

export default DoughnutChart;
