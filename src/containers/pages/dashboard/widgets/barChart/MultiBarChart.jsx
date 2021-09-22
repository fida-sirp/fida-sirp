import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import NoWidgetData from '../NoWidgetData';
import { MultiBarCHartWrapper } from './StyledComponents';
import { Label } from '../../../../../components/SelectBox/StyledComponents';

function MultiBarChart({ data, title, width, height, item }) {
  const [controls, setControls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setControls([]);
  }, [width, height]);

  useEffect(() => {
    if (data && data.length > 0) {
      const chartDetails = data[0].data || [];
      const chartLabel = data[0].label || [];
      setCategories(data[0].label || [])
      if (chartLabel?.length > 0) {
        const chartData = chartDetails.map((item, labelIndex) => {
          return {
            name: item.label,
            data: item?.data.map(i=> Number(i)),
          };
        });
        setChartData(chartData);
      }
    }
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      window.Highcharts.chart(`multibar_${item}`, {
        chart: {
          type: 'column',
          renderTo: `multibar_${item}`,
          reflow: false,
      },
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
           [0, '#2a2a2b'],
           [1, '#3e3e40']
        ]
     },
     plotBorderColor: '#606063',
     title: {
      text: title,
      align: 'start',
      style: {
        color: '#fff',
        textAnchor: 'start',
        fontFamily: 'Arial',
        fontSize: 15.5,
        fontWeight: 'bold',
        stroke: 'none',
        strokeWidth: 0,
      },
    },
      xAxis: {
          categories: categories
      },
      yAxis: {
          min: 0,
          title: {
              text: title
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: ( // theme
                      Highcharts.defaultOptions.title.style &&
                      Highcharts.defaultOptions.title.style.color
                  ) || 'gray'
              }
          }
      },
      exporting: { enabled: false },
      legend: {
          align: 'center',
          verticalAlign: 'bottom',
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: false
              }
          }
      },
      series: chartData
      });
    }
  }, [chartData, height, width]);

  return chartData ? (
    <MultiBarCHartWrapper>
      <div
        id={`multibar_${item}`}
        style={{ height: height, width: width}}
      ></div>
    </MultiBarCHartWrapper>
  ) : (
    <NoWidgetData width={width} height={height} />
  );
}

export default MultiBarChart;
