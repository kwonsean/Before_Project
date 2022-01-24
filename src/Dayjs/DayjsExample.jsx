import React from 'react'
import dayjs from 'dayjs'

dayjs.locale('ko')

function DayjsExample() {
  const Dayjs = dayjs()
  console.log(Dayjs)
  const newDayjsDate = Dayjs.add(1, 'week')
  const cloneNewDayjsDate = newDayjsDate.add(1, 'week')
  return (
    <div>
      <h1>Day.js</h1>
      <div>Immutable Check</div>
      <div>
        {Dayjs.format()}
        <br />
        {newDayjsDate.format()}
        <br />
        {cloneNewDayjsDate.format()}
      </div>
      <div>
        <h3>한국어로 표현</h3>
        {Dayjs.format('YYYY년 M월 D일')}
      </div>
    </div>
  )
}

export default DayjsExample
