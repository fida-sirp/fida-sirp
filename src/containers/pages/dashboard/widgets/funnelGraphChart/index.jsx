import React, { useEffect, useState } from 'react';
import { isNumber, isString } from 'lodash';
import NoWidgetData from '../NoWidgetData';

const FunnelGraphChart = ({ data, title, width, height, item }) => {
  const [chartData, setChartData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const chartDetails = data[0];
    let count = 0;
    const chartKeys = Object.keys(data[0].data);
    const mergedData = [];
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
    // const cartesianProduct = cartesianProductOf(chartDetails.label,chartDetails.data,chartDetails.backgroundColor);
    setChartData([...chartData, ...mergedData]);
  }, [data]);

  useEffect(() => {
    const node = document.getElementById(`funnelGraphContainer_${item}`);
    if (data && data.length > 0 && node) {
      window.Highcharts.chart(`funnelGraphContainer_${item}`, {
        chart: {
          backgroundColor: '#1C1C24',
          type: 'funnel',
          renderTo: `funnelGraphContainer_${item}`,
          reflow: false,
        },
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
        plotOptions: {
          series: {
            showInLegend: true,
            dataLabels: {
              enabled: false,
            },
            center: ['50%', '50%'],
            neckWidth: '15%',
            neckHeight: '20%',
            width: width / 2,
          },
        },
        legend: {
          enabled: true,
          itemStyle: { color: '#fff' },
        },
        exporting: {
          enabled: false,
        },
        series: [
          {
            name: 'Unique users',
            data: chartData,
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                plotOptions: {
                  series: {
                    dataLabels: {
                      inside: true,
                    },
                    center: ['50%', '50%'],
                    width: '100%',
                  },
                },
              },
            },
          ],
        },
      });
    }
  }, [width, height, chartData]);

  return (
    // <Container style={{height: height, width: width}}>
    data && data.length > 0 && count > 0 ? (
      <div
        id={`funnelGraphContainer_${item}`}
        style={{ height: height, width: width }}
      />
    ) : (
      <NoWidgetData width={width} height={height} />
    )
    // </Container>
  );
};

export default FunnelGraphChart;
