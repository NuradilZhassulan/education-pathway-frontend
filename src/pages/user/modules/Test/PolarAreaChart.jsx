import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import 'chart.js/auto';

const PolarAreaChart = ({ data }) => {
  // Здесь data предполагается быть объектом с полями labels и datasets
  return <PolarArea data={data} />;
};

export default PolarAreaChart;
