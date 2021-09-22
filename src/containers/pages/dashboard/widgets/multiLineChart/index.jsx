import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { isEmpty } from 'lodash';

import NoWidgetData from '../NoWidgetData';
import { Label } from '../../../../../components/SelectBox/StyledComponents';

function MultiLineChart({ data, title, width, height }) {
  // debugger;
  const [controls, setControls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartColorData, setChartColorData] = useState([]);

  useEffect(() => {
    setControls([]);
  }, [width, height]);

  useEffect(() => {
    if (data && data.length > 0) {
      const chartDetails = data[0].data || [];
      const chartLabel = data[0].label || [];

      let colorData =
        chartDetails?.length > 0 &&
        chartDetails.map(cd => {
          return { color: cd.borderColor };
        });
      let chartLabelData = chartDetails?.length > 0 && [
        ['x', ...chartDetails.map(cd => cd.label)],
      ];
      if (chartLabel?.length > 0) {
        const chartData = chartLabel.map((label, labelIndex) => {
          const chartUpdatedData = [label];
          if (chartDetails?.length > 0) {
            chartDetails.map((cd, cdIndex) => {
              chartUpdatedData.push(
                parseInt(chartDetails[cdIndex].data[labelIndex])
              );
            });
          }
          return chartUpdatedData;
        });

        setChartData([...chartLabelData, ...chartData]);
        setChartColorData(colorData);
      }
    }
  }, []);

  return !isEmpty(chartData) ? (
    <Chart
      width={width}
      height={height}
      controls={controls}
      chartType="LineChart"
      loader={<Label>Loading Chart</Label>}
      data={chartData}
      options={{
        sliceVisibilityThreshold: 0.2,
        // pieSliceText: 'none',
        title,
        titleTextStyle: {
          color: '#fff',
          textAnchor: 'start',
          fontFamily: 'Arial',
          fontSize: 15.5,
          fontWeight: 'bold',
          stroke: 'none',
          strokeWidth: 0,
       },
        hAxis: {
          textStyle: { color: '#BDBDBD' },
          gridlines: {
            color: '#1C1C24',
          },
        },
        legend: {
          position: 'bottom',
          // width: '100%',
          textStyle: {
            color: '#FFFFFF',
          },
        },
        vAxis: {
          textStyle: { color: '#BDBDBD' },
          gridlines: {
            count: 5,
            color: '#373747',
          },
        },
        backgroundColor: '#1C1C24',
        series: chartColorData,
      }}
      rootProps={{ 'data-testid': '3' }}
    />
  ) : (
    <NoWidgetData height={height} width={width} />
  );
  // </div>
}

export default MultiLineChart;
