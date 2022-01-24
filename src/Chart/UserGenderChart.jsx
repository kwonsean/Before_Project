import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const UserGenderChart = ({ genderData }) => {
  const label = genderData.map((item) => item.성별)
  const countData = genderData.map((item) => item['성별 수'])
  const data = {
    labels: label,
    datasets: [
      {
        label: 'Dataset 1',
        data: countData,
        backgroundColor: ['#a5dfdf', '#ffb1c1'],
      },
    ],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '상품별 성별 데이터',
        },
      },
    },
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        title: 'asdsa',
      },
      tooltip: {
        emabled: false,
      },
      title: {
        display: true,
        text: 'USER 성별 통계',
        position: 'top',
      },
    },
  }
  return <Doughnut data={data} options={options} />
}

export default UserGenderChart
