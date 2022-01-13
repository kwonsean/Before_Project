import React, { useEffect, useState } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js'

import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

function GenderChart({ genderData }) {
  const [data, setData] = useState({})
  // TODO 한박자 늦은 data 업데이트로 오류남..
  useEffect(() => {
    if (genderData === undefined) return
    console.log('genderData', genderData)
    setData((cur) => ({
      ...cur,
      labels: genderData.keys(),
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
        },
      ],
    }))
  }, [genderData])

  const config = {
    type: 'Doughnut',
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  }

  return (
    <>
      {genderData !== undefined ? (
        <Doughnut data={data} width={50} height={50} />
      ) : null}
    </>
  )
}

export default GenderChart
