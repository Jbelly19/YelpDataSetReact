import React from 'react';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

const RestaurantPieChart = props => {
  const getFreqCount = () => {
    let freqCount = {};

    for (let { categories } of props.restaurants) {
      categories
        .split(', ')
        .filter(item => item !== 'Restaurants')
        .forEach(category => {
          if (freqCount.hasOwnProperty(category)) {
            freqCount[category]++;
          } else {
            freqCount[category] = 1;
          }
        });
    }

    return freqCount;
  };

  const getCategoryPercents = () => {
    let colors = [
      '#191970',
      '#9932CC',
      '#FF4500',
      '#9ACD32',
      '#708090',
      '#FFD700',
      '#800080',
      '#FF0000'
    ];

    let categoryFreqCount = getFreqCount();

    let numberOfCategories = Object.keys(categoryFreqCount).length;

    let numSegments = 8;
    if (numberOfCategories < 9) {
      numSegments = numberOfCategories;
    }

    let data = Object.entries(categoryFreqCount)
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .slice(0, numSegments)
      .map((category, index) => ({
        title: category[0],
        value: category[1],
        color: colors[index]
      }));

    return {
      data: data,
      count: data.reduce((sum, curr) => sum + curr.value, 0)
    };
  };

  const getPieChart = () => {
    if (props.restaurants.length) {
      let { data, count } = getCategoryPercents();
      return (
        <ReactMinimalPieChart
          animate={true}
          animationDuration={1000}
          animationEasing="ease-out"
          cx={50}
          cy={25}
          data={data}
          label={({ data, dataIndex }) =>
            `${data[dataIndex].title} ${Math.round(data[dataIndex].percentage) +
              '%'}`
          }
          labelPosition={108}
          labelStyle={{
            fontFamily: 'sans-serif',
            fontSize: '2px'
          }}
          lengthAngle={360}
          lineWidth={100}
          paddingAngle={0}
          radius={20}
          ratio={1}
          rounded={false}
          startAngle={0}
          totalValue={count}
        />
      );
    }
    // Still Loading
    return (
      <div className="ui segment">
        <div className="ui active dimmer">
          <div className="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  };

  return <div>{getPieChart()}</div>;
};

export default RestaurantPieChart;
