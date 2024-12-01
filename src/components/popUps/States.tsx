import React from 'react'
import { useSelector } from 'react-redux'

import { getMessage, getStatusCode } from '../../RTK/slices/NotificationSlice'
import attentionSvg from '../../img/attention.svg'
import successSvg from '../../img/check.svg'
import '../../scss/Notifications/notifications.scss'

const States: React.FC = () => {
  const data = useSelector(getMessage)
  const statusCode = Math.round(useSelector(getStatusCode) / 100)
  console.log(data)
  return (
    <div
      className={`${data ? 'notif visible' : 'notif hidden2'} ${
        statusCode === 2 ? 'green' : 'red'
      }`}
    >
      <img
        className='notif_img'
        src={statusCode === 2 ? successSvg : attentionSvg}
        alt='icon'
      ></img>
      {data}
    </div>
  )
}

export default States
