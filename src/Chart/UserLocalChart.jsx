import React from 'react'
import { PolarArea } from 'react-chartjs-2'

function UserLocalChart({ localData }) {
  const countData = localData
    .map((item, i) => {
      if (item['지역 통합'] !== '' && i !== localData.length - 1) {
        return item['지역 통합']
      }
    })
    .filter((item) => item !== undefined)
  const label = ['서울', '경기', '충청', '강원', '경상', '전라', '제주'].map(
    (item, i) => {
      return `${item} (${countData[i]}명)`
    }
  )
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
          '#9df59a',
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
        text: 'USER 지역 통계',
        position: 'top',
      },
    },
  }

  return <PolarArea data={data} options={options} />
}

export default UserLocalChart
