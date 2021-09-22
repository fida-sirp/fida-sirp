import React, { useEffect } from 'react';
import Container from './StyledComponents';

const TreeChart = ({ data, pointClickHandler }) => {
  const handlePointClick = () => {
    // console.log('test');
  };

  useEffect(() => {
    if (data && data.length > 0) {
      window.Highcharts.addEvent(
        window.Highcharts.Series,
        'afterSetOptions',
        function (e) {
          let colors = window.Highcharts?.getOptions()?.colors;
          let i = 0;
          const nodes = {};

          if (
            this instanceof window.Highcharts.seriesTypes.networkgraph &&
            e.options.id === 'lang-tree'
          ) {
            e.options.data.forEach(function (link) {

              if (link[0] === data[0][0]) {
                const key = link[0];
                nodes[key] = {
                  id: key,
                  marker: {
                    radius: 40,
                  },
                  mass: 5,
                  color: {
                    linearGradient: { x1: 1, x2: 0.5, y1: 0, y2: 1 },
                    stops: [
                      [0, '#02F1E2'], // start
                      [0.5, '#4EFD72'], // middle
                      [1, '#02F1E2'], // end
                    ],
                    states: {},
                  },
                };
                nodes[link[1]] = {
                  id: link[1],
                  marker: {
                    radius: 20,
                    symbol: 'circle',
                  },
                  color: colors[0],
                  colorIndex: 4,
                  mass: 5,
                };
              } else if (nodes[link[0]] && nodes[link[0]].color) {
                nodes[link[1]] = {
                  id: link[1],
                  color: colors[nodes[link[0]].colorIndex + 1],
                  marker: {
                    radius: nodes[link[0]].marker.radius * 0.6,
                    symbol: 'circle',
                  },
                  colorIndex: nodes[link[0]].colorIndex + 1,
                };
              }
            });

            e.options.nodes = Object.keys(nodes).map(function (id) {
              return nodes[id];
            });
          }
        }
      );

      window.Highcharts.chart('tree-chart-container', {
        chart: {
          type: 'networkgraph',
          height: '800px',
        },
        boost: {
          useGPUTranslations: true,
        },
        plotOptions: {
          networkgraph: {
            keys: ['from', 'to'],

            layoutAlgorithm: {
              enableSimulation: false,
              // linkLength: 33,
              integration: 'verlet',
              approximation: 'barnes-hut',
              // gravitationalConstant: 0
            },
            dataLabels: {
              enabled: true,
              lineText: {
                enabled: false,
              },
              lineTextPath: {
                enabled: false,
              },
              style: {
                color: '#fff',
                fontSize: '11px',
              },
            },

            allowPointSelect: true,
            stickyTracking: false,
          },
        },
        series: [
          {
            dataLabels: {
              enabled: true,
              format: '{point.name}',
              useHTML: true,
              // className: "node-datalabel",
              align: 'center',
              verticalAlign: 'top',
              textPath: {
                enabled: false,
              },
              linkFormat: '',
              allowOverlap: false,
              y: 13,
              style: {
                textOutline: 'none',
                width: '120px',
                textAlign: 'center',
              },
            },
            point: {
              events: {
                click: pointClickHandler,
              },
            },
            id: 'lang-tree',
            data: data,
          },
        ],
        credits: {
          enabled: false,
        },
      });
    }
  }, []);

  return (
    <Container>
      {data && data.length > 0 && (
        <figure className="highcharts-figure">
          <div id="tree-chart-container" />
        </figure>
      )}
    </Container>
  );
};

export default TreeChart;
