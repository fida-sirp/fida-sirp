import { isArray } from 'lodash';
import React, {useState, useEffect } from 'react';
import Container from './StyledComponents';

const SPTimeLine = ({ data, id = 'timeline-chart-container' }) => {
  const [timelineData, setTimelineData] = useState([]);
  useEffect(()=>{
    if(data){
      if(timelineData.length !== data.length){
        setTimelineData(data);
      }
    }

  }, [data]);
  useEffect(() => {
    window.Highcharts.chart(id, {
      chart: {
        zoomType: 'x',
        type: 'timeline',
        scrollablePlotArea: {
          minWidth: 100,
          scrollPositionX: 1,
        },
      },
      xAxis: {
        type: 'datetime',
        visible: true,
        scrollbar: {
          enabled: false,
        },
      },
      yAxis: {
        gridLineWidth: 1,
        title: null,
        labels: {
          enabled: false,
        },
      },
      legend: {
        enabled: false,
      },
      title: {
        text: 'Timeline',
      },
      subtitle: {
        text: '',
      },
      tooltip: {
        style: {
          width: 300,
        },
        // enabled: false,
      },
      scrollbar: { enabled: true },

      series: [
        {
          dataLabels: {
            backgroundColor: '#2C2C38',
            allowOverlap: false,
            format:
              '<span style="color:{point.color}">● </span><span style="font-weight: bold;color:#fff" > ' +
              '{point.user}  - {point.x:%d %b %Y %H:%m:%S}</span><br/><span style="color:#fff">{point.label}</span>',
          },
          marker: {
            symbol: 'circle',
          },
          data: isArray(timelineData) ? timelineData : [],
        },
      ],
    });
  }, [timelineData]);

  return (
    <Container>
      <div className={'chart-div'} id={id} />
    </Container>
  );
};

export default SPTimeLine;
