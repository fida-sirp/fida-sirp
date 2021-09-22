import React, { useEffect, useState } from 'react';
import NoWidgetData from '../NoWidgetData';

const FunnelGraphHorizontal = ({ data, title, width, height, item }) => {
  // const [chartData, setChartData] = useState([]);
  const [funnelChartData, setFunnelChartData] = useState([]);
  const [zones, setZones] = useState([]);
  const [underData, setUnderData] = useState([]);
  const [overData, setOverData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const rawData = data[0].data.map(d => parseInt(d));
    const funnelChartData = [[0, 100]];
    const overData = [[0, 0]];
    const underData = [[0, 0]];
    const zones = [];
    const len = rawData.length;
    const colors = data[0]?.backgroundColor || [];
    let i,
      val,
      sum = 0,
      pos = 0;

    for (i = 0; i < len; i++) {
      sum += rawData[i];
    }

    for (i = 0; i < len; i++) {
      pos += rawData[i];
      val = ((sum - pos) / sum) * 100;
      funnelChartData.push([pos, val]);
      overData.push([pos, (100 - val) / 2]);
      underData.push([pos, (100 - val) / 2]);
      zones.push({
        value: pos,
        color: colors[i],
      });
    }
    console.log('<<<<<<<<<<<ZONES', zones);
    setFunnelChartData(funnelChartData);
    setZones(zones);
    setUnderData(underData);
    setOverData(overData);
  }, []);

  useEffect(() => {
    const node = document.getElementById(
      `funnelGraphHorizontalContainer_${item}`
    );
    if (funnelChartData.length > 0 && node) {
      window.Highcharts.chart(`funnelGraphHorizontalContainer_${item}`, {
        chart: {
          backgroundColor: '#1C1C24',
          type: 'area',
          renderTo: `funnelGraphHorizontalContainer_${item}`,
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
        yAxis: {
          title: {
            text: '',
          },
        },
        plotOptions: {
          area: {
            enableMouseTracking: false,
            showInLegend: false,
            stacking: 'percent',
            lineWidth: 0,
            marker: {
              enabled: false,
            },
          },
        },
        series: [
          {
            name: 'over',
            color: 'none',
            data: overData,
          },
          {
            id: 's1',
            name: 'Series',
            data: funnelChartData,
            showInLegend: true,
            zoneAxis: 'x',
            zones: zones,
          },
          {
            name: 'under',
            color: 'none',
            data: underData,
          },
        ],
        exporting: {
          enabled: false,
        },
      });
    }
  }, [funnelChartData, zones, underData, overData, width, height]);

  return funnelChartData.length > 0 ? (
    <div
      id={`funnelGraphHorizontalContainer_${item}`}
      style={{ height: height, width: width }}
    />
  ) : (
    <NoWidgetData width={width} height={height} />
  );
};
export default FunnelGraphHorizontal;
