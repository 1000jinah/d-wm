import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
HighchartsHeatmap(Highcharts);
const GoalBar = () => {
  useEffect(() => {
    // Highcharts 설정
    const options = {
      chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1,
      },
      title: {
        text: 'Flame Chart Example',
      },
      xAxis: {
        categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      },
      yAxis: {
        title: null,
      },
      colorAxis: {
        stops: [
          [0, '#3060cf'],
          [0.5, '#fffbbc'],
          [0.9, '#c4463a'],
          [1, '#c4463a'],
        ],
        min: 0,
      },
      series: [{
        borderWidth: 1,
        data: [
          [0, 0, 10],
          [0, 1, 19],
          [0, 2, 8],
          [0, 3, 24],
          [1, 0, 92],
          [1, 1, 58],
          [1, 2, 78],
          [1, 3, 117],
          [2, 0, 35],
          [2, 1, 15],
          [2, 2, 123],
          [2, 3, 64],
          [3, 0, 72],
          [3, 1, 132],
          [3, 2, 114],
          [3, 3, 19],
        ],
        dataLabels: {
          enabled: true,
          color: '#000000',
        },
      }],
    };

    // 차트 렌더링
    Highcharts.chart('flame-chart-container', options);
  }, []);

  return (
    <div id="flame-chart-container" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default GoalBar;
