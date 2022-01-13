import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
import { Line, Pie, Bar, Doughnut, Radar } from 'react-chartjs-2'

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

function Chart() {
  const URL = 'https://syoon0624.github.io/json/test.json'
  const [num, setNum] = useState([])
  const [labels, setLabels] = useState([])

  const getData = async () => {
    const { data } = await axios.get(URL)
    console.log(data)
    const newData = [...data.bankList]
    const set = new Set()
    newData.forEach(({ history }) => {
      set.add(history)
    })
    const label = []
    set.forEach((item) => label.push(item))
    setLabels(label)

    const a = label.map((name) => {
      let totalPrice = 0
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].history === name) totalPrice += newData[i].price
      }
      return totalPrice
    })
    setNum(a)
  }

  useEffect(() => {
    getData()
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Test',
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: num,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return <Doughnut data={data} width={50} height={50} />
}

export default Chart
