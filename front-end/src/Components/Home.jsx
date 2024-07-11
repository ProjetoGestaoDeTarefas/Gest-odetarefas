import React from 'react';
import { Chart } from 'react-google-charts';

const Home = () => {
  // Dados do gráfico de exemplo
  const chartData = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ];

  return (
    <div className="container">
      <h2>Gráfico de Exemplo</h2>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="PieChart"
        loader={<div>Carregando Gráfico</div>}
        data={chartData}
        options={{
          title: 'My Daily Activities',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default Home;
