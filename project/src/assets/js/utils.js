const BASE_URL = window.g.BASE_URL
const BASE_PORT = window.g.BASE_PORT

const MQTT_HOST = window.g.MQTT_HOST
const MQTT_PORT = window.g.MQTT_PORT

const formatTime = (val) => {
  const time = new Date(val)
  const year = time.getFullYear()
  const month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
  const day = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()

  let hour = time.getHours()
  let minute = time.getMinutes()
  let seconds = time.getSeconds()

  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds
}

export {
  BASE_URL,
  BASE_PORT,
  MQTT_HOST,
  MQTT_PORT,
  formatTime
}
