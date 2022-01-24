import React from 'react'
import { PolarArea, Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title)

function UserAgeChart({ ageData }) {
  console.log(ageData)
  const label = ageData.map((item) => {
    return `${item.연령대} (${item['연령대 수']}명) `
  })
  const countData = ageData.map((item) => item['연령대 수'])
  console.log(label, countData)
  const data = {
    labels: label,
    datasets: [
      {
        label: 'Dataset 2',
        data: countData,
        backgroundColor: [
          '#ffb1c1',
          '#ffcf9f',
          '#ffe6aa',
          '#a5dfdf',
          '#9ad0f5',
          '#db9af5',
        ],
      },
    ],
    options: { maintainAspectRatio: false },
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        title: 'asdsa',
        position: 'left',
      },
      tooltip: {
        emabled: false,
      },
      title: {
        display: true,
        text: 'USER 나이 통계',
        position: 'top',
      },
    },
  }

  return <PolarArea data={data} options={options} />
}

export default UserAgeChart
