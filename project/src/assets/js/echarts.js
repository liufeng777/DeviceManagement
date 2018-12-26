import echarts from 'echarts'
import { formatTime } from './utils'

const lineEcharts = (color, title, data) => {
  return {
    color: color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: (params) => {
        let res = formatTime(+params[0].value[0]) + '</p></div>'
        for (let i = 0; i < params.length; i++) {
          res += '<p>' + params[i].seriesName + ' : ' + params[i].data[1] + '</p>'
        }
        return res
      },
      extraCssText: 'width: 160px; height: 80px; background: #787878;'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      },
      boundaryGap: false,
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: title,
        type: 'line',
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: color
            }, {
              offset: 1,
              color: '#fff'
            }])
          }
        },
        symbolSize: 10,
        smooth: true,
        data: data
      }
    ]
  }
}

const statusEchars = (title, dataArr) => {
  return {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        let res = formatTime(+params[0].value[0]) + '</p></div>'
        for (let i = 0; i < params.length; i++) {
          res += '<p>' + params[i].seriesName + ' : ' + (+params[i].data[1] === 1 ? '开启' : '关闭') + '</p>'
        }
        return res
      },
      extraCssText: 'width: 160px; height: 80px; background: #787878;'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      },
      boundaryGap: false,
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: {
      splitLine: {
        show: false
      },
      minInterval: 1
    },
    visualMap: {
      top: 0,
      right: 0,
      pieces: [{
        gte: 0,
        lte: 0,
        label: '关闭',
        color: '#F56C6C'
      }, {
        gte: 1,
        lte: 1,
        label: '开启',
        color: '#67C23A'
      }]
    },
    series: {
      name: '状态',
      type: 'line',
      data: dataArr,
      symbolSize: 8,
      symbol: 'circle',
      itemStyle: {
        normal: {
          lineStyle: {
            width: 2
          }
        }
      }
    }
  }
}

export {
  lineEcharts,
  statusEchars
}
