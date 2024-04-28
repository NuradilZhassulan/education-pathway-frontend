import React from 'react';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';

const RadarChart = ({ data }) => {
  // Здесь data предполагается быть объектом с полями labels и datasets
  return <Radar data={data} />;
};

export default RadarChart;
