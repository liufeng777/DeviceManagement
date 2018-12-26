<template>
    <div class="page-map">
        <div class="topbar">
            <div class="title">设备分布</div>
        </div>
        <div class="map-container" id="container"></div>
    </div>
</template>

<script>
import { deviceMap } from '@/api/getData'

export default {
  data () {
    return {
      // 设备数据
      deviceData: [],
      // 实时数据
      isConnected: false,
      client: null,
      dataObj: {}
    }
  },
  computed: {
    userInfo () {
      return JSON.parse(sessionStorage.getItem('user-info'))
    },
    pwd () {
      return sessionStorage.getItem('pwd')
    },
    msg () {
      return `
      <p class="data-type" style="color: #E6A23C"><i class="iconfont icon-icon-test"></i>油烟</p>
      <table>
      <tr><th>路数</th><th>温度<span class="unit">℃</span></th><th>湿度<span class="unit">%</span></th><th>油烟浓度<span class="unit">mg/m<sup>3</sup></span></th><th>颗粒物含量<span class="unit">mg/m<sup>3</sup></span></th><th>非甲烷总烃<span class="unit">mg/m<sup>3</sup></span></th></tr>
      <tr><td>01</td><td>${this.dataObj.a1 ? this.dataObj.a1 : ''}</td><td>${this.dataObj.b1 ? this.dataObj.b1 : ''}</td><td>${this.dataObj.e1 ? this.dataObj.e1 : ''}</td><td>${this.dataObj.f1 ? this.dataObj.f1 : ''}</td><td>${this.dataObj.g1 ? this.dataObj.g1 : ''}</td></tr>
      <tr><td>02</td><td>${this.dataObj.a2 ? this.dataObj.a2 : ''}</td><td>${this.dataObj.b2 ? this.dataObj.b2 : ''}</td><td>${this.dataObj.e2 ? this.dataObj.e2 : ''}</td><td>${this.dataObj.f2 ? this.dataObj.f2 : ''}</td><td>${this.dataObj.g2 ? this.dataObj.g2 : ''}</td></tr>
      <tr style="visibility: ${(this.dataObj.a3 || this.dataObj.b3 || this.dataObj.e3 || this.dataObj.f3 || this.dataObj.g3) ? 'visible' : 'hidden'}"><td>03</td><td>${this.dataObj.a3 ? this.dataObj.a3 : ''}</td><td>${this.dataObj.b3 ? this.dataObj.b3 : ''}</td><td>${this.dataObj.e3 ? this.dataObj.e3 : ''}</td><td>${this.dataObj.f3 ? this.dataObj.f3 : ''}</td><td>${this.dataObj.g3 ? this.dataObj.g3 : ''}</td></tr>
      <tr style="visibility: ${(this.dataObj.a4 || this.dataObj.b4 || this.dataObj.e4 || this.dataObj.f4 || this.dataObj.g4) ? 'visible' : 'hidden'}"><td>04</td><td>${this.dataObj.a4 ? this.dataObj.a4 : ''}</td><td>${this.dataObj.b4 ? this.dataObj.b4 : ''}</td><td>${this.dataObj.e4 ? this.dataObj.e4 : ''}</td><td>${this.dataObj.f4 ? this.dataObj.f4 : ''}</td><td>${this.dataObj.g4 ? this.dataObj.g4 : ''}</td></tr>
      <tr style="visibility: ${(this.dataObj.a5 || this.dataObj.b5 || this.dataObj.e5 || this.dataObj.f5 || this.dataObj.g5) ? 'visible' : 'hidden'}"><td>05</td><td>${this.dataObj.a5 ? this.dataObj.a5 : ''}</td><td>${this.dataObj.b5 ? this.dataObj.b5 : ''}</td><td>${this.dataObj.e5 ? this.dataObj.e5 : ''}</td><td>${this.dataObj.f5 ? this.dataObj.f5 : ''}</td><td>${this.dataObj.g5 ? this.dataObj.g5 : ''}</td></tr>
      <tr style="visibility: ${(this.dataObj.a6 || this.dataObj.b6 || this.dataObj.e6 || this.dataObj.f6 || this.dataObj.g6) ? 'visible' : 'hidden'}"><td>06</td><td>${this.dataObj.a6 ? this.dataObj.a6 : ''}</td><td>${this.dataObj.b6 ? this.dataObj.b6 : ''}</td><td>${this.dataObj.e6 ? this.dataObj.e6 : ''}</td><td>${this.dataObj.f6 ? this.dataObj.f6 : ''}</td><td>${this.dataObj.g6 ? this.dataObj.g6 : ''}</td></tr>
      </table>
      <div class="flex-container">
        <div class="flex-box">
          <p class="data-type" style="color: #409EFF"><i class="iconfont icon-fengji"></i>风机</p>
          <table>
          <tr><th>路数</th><th>状态</th><th>电流<span class="unit">A</span></th><th>频率<span class="unit">Hz</span></th></tr>
          <tr><td>01</td><td>${+this.dataObj.h1 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.i1 ? this.dataObj.i1 : ''}</td><td>${this.dataObj.j1 ? this.dataObj.j1 : ''}</td></tr>
          <tr><td>02</td><td>${+this.dataObj.h2 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.i2 ? this.dataObj.i2 : ''}</td><td>${this.dataObj.j2 ? this.dataObj.j2 : ''}</td></tr>
          <tr style="visibility: ${(this.dataObj.h3 || this.dataObj.i3 || this.dataObj.j3) ? 'visible' : 'hidden'}"><td>03</td><td>${+this.dataObj.h3 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.i3 ? this.dataObj.i3 : ''}</td><td>${this.dataObj.j3 ? this.dataObj.j3 : ''}</td></tr>
          <tr style="visibility: ${(this.dataObj.h4 || this.dataObj.i4 || this.dataObj.j4) ? 'visible' : 'hidden'}"><td>04</td><td>${+this.dataObj.h4 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.i4 ? this.dataObj.i4 : ''}</td><td>${this.dataObj.j4 ? this.dataObj.j4 : ''}</td></tr>
          <tr style="visibility: ${(this.dataObj.h5 || this.dataObj.i5 || this.dataObj.j5) ? 'visible' : 'hidden'}"><td>05</td><td>${+this.dataObj.h5 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.i5 ? this.dataObj.i5 : ''}</td><td>${this.dataObj.j5 ? this.dataObj.j5 : ''}</td></tr>
          <tr style="visibility: ${(this.dataObj.h6 || this.dataObj.i6 || this.dataObj.j6) ? 'visible' : 'hidden'}"><td>06</td><td>${+this.dataObj.h6 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.i6 ? this.dataObj.i6 : ''}</td><td>${this.dataObj.j6 ? this.dataObj.j6 : ''}</td></tr>
          </table>
        </div>
        <div class="flex-box">
          <p class="data-type" style="color: #67C23A"><i class="iconfont icon-jinghuaqi"></i>净化器</p>
          <table>
          <tr><th>路数</th><th>状态</th><th>电压<span class="unit">V</span></th><th>电流<span class="unit">A</span></th></tr>
          <tr><td>01</td><td>${+this.dataObj.k1 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.l1 ? this.dataObj.l1 : ''}</td><td>${this.dataObj.m1 ? this.dataObj.m1 : ''}</td></tr>
          <tr><td>02</td><td>${+this.dataObj.k2 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.l2 ? this.dataObj.l2 : ''}</td><td>${this.dataObj.m2 ? this.dataObj.m2 : ''}</td></tr>
          <tr style="visibility: ${(this.dataObj.k3 || this.dataObj.l3 || this.dataObj.m3) ? 'visible' : 'hidden'}"><td>03</td><td>${+this.dataObj.k3 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.l3 ? this.dataObj.l3 : ''}</td><td>${this.dataObj.m3 ? this.dataObj.m3 : ''}</td></tr>
          <tr style="visibility: ${(this.dataObj.k4 || this.dataObj.l4 || this.dataObj.m4) ? 'visible' : 'hidden'}"><td>04</td><td>${+this.dataObj.k4 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.l4 ? this.dataObj.l4 : ''}</td><td>${this.dataObj.m4 ? this.dataObj.m4 : ''}</td></tr>
          <tr style="visibility: ${(this.dataObj.k5 || this.dataObj.l5 || this.dataObj.m5) ? 'visible' : 'hidden'}"><td>05</td><td>${+this.dataObj.k5 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.l5 ? this.dataObj.l5 : ''}</td><td>${this.dataObj.m5 ? this.dataObj.m5 : ''}</td></tr>
          <tr style="visibility: ${(this.dataObj.k6 || this.dataObj.l6 || this.dataObj.m6) ? 'visible' : 'hidden'}"><td>06</td><td>${+this.dataObj.k6 === 1 ? '开启' : '关闭'}</td><td>${this.dataObj.l6 ? this.dataObj.l6 : ''}</td><td>${this.dataObj.m6 ? this.dataObj.m6 : ''}</td></tr>
          </table>
        </div>
      </div>
      `
    }
  },
  mounted () {
    this.getMapList()
  },
  beforeRouteLeave (to, from, next) {
    if (this.client) {
      this.client.disconnect()
      this.isConnected = false
      this.client = null
    }
    next()
  },
  methods: {
    async getMapList () {
      const res = await deviceMap({
        uid: this.userInfo.uid
      })
      if (res) {
        this.deviceData = res.dev_list
        // this.deviceData = [{
        //   id: 541,
        //   latitude: 34.916527,
        //   longitude: 104.397128,
        //   mac: '60019443E55A',
        //   name: '样品'
        // }, {
        //   id: 542,
        //   latitude: 34.916527,
        //   longitude: 103.397128,
        //   mac: '60019402944E',
        //   name: 'yangpin2'
        // }, {
        //   id: 591,
        //   latitude: 34.916527,
        //   longitude: 104.697128,
        //   mac: 'ECFABC8DB8A7',
        //   name: 'ces2'
        // }, {
        //   id: 610,
        //   latitude: 34.916527,
        //   longitude: 104.597128,
        //   mac: '809800000013',
        //   name: '测试仓储'
        // }]
        this.drawMap()
      }
    },
    drawMap () {
      const self = this
      /************************************************************/
      let MVCArray = qq.maps.MVCArray
      let MarkerCluster = qq.maps.MarkerCluster

      /************************************************************/
      // map
      const centerLatLng = new qq.maps.LatLng(38.916527, 105.397128)
      const mapOptions = {
        'zoom': 4,
        'center': centerLatLng,
        'mapTypeId': 'roadmap'
      }

      const map = new qq.maps.Map(document.getElementById('container'), mapOptions)

      /** *********************markers****************************** **/
      const markers = new MVCArray()

      const infoWin = new qq.maps.InfoWindow({
        map: map
      })

      // const data = [[34.916527, 104.397128], [34.916527, 103.397128], [34.916527, 104.697128], [34.916527, 104.597128]]
      const data = this.deviceData
      let markerClusterer
      function refreshMarkers (size, data) {
        const oldSize = markers.getLength()

        for (let i = 0; i < oldSize; i++) {
          var marker = markers.pop()
          marker.setMap(null)
        }
        infoWin.close()

        for (let i = 0; i < size; i++) {
          (function (n) {
            var latLng = new qq.maps.LatLng(data[n].latitude, data[n].longitude)
            var marker = new qq.maps.Marker({
              position: latLng,
              map: map
            })
            markers.push(marker)
            qq.maps.event.addListener(marker, 'click', async () => {
              if (self.client) {
                self.client.disconnect()
              }

              let mac = data[n].mac
              await self.connect(mac)

              let title = `<p class="device-title"><span>名称：${data[n].name}</span><span class="center-span">纬度：${data[n].latitude.toFixed(2)}</span><span>经度：${data[n].longitude.toFixed(2)}</span></p>`
              markInfo(marker.position, `${title + self.msg}`)
            })
          })(i)
        }
        markerClusterer = new MarkerCluster({
          map: map,
          minimumClusterSize: 2, // 2
          markers: markers,
          zoomOnClick: true, // ?true
          gridSize: 30, // 60
          averageCenter: true, // false
          maxZoom: 18 // 18
        })
        markerClusterer.markers = markers
      }

      // function panTo (x, y) {
      //   map.panTo(new qq.maps.LatLng(x, y))
      // }

      // function markInfo (lat, lng, text) {
      //   const latlng = new qq.maps.LatLng(lat, lng)

      //   infoWin.setPosition(latlng)
      //   infoWin.setContent(text)
      //   infoWin.open()
      // }

      function markInfo (position, text) {
        infoWin.setPosition(position)
        infoWin.setContent(text)
        infoWin.open()
      }

      refreshMarkers(data.length, data)
      // function onMapInit () {
      //   refreshMarkers(data.length, data)
      // }
    },
    // 获取实时数据
    connect (mac) {
      const self = this

      let hostname = self.$utils.MQTT_HOST
      let port = self.$utils.MQTT_PORT
      let clientId = self.userInfo.tel + '-' + +new Date()
      let userName = self.userInfo.tel
      let password = self.pwd
      let timeout = 10
      let keepAlive = 60
      let cleanSession = true

      self.client = new Paho.Client(hostname, Number(port), clientId)

      let options = {
        timeout: timeout,
        keepAliveInterval: keepAlive,
        cleanSession: cleanSession,
        userName: userName,
        password: password,
        useSSL: false,
        reconnect: true,
        onSuccess: onConnect
      }

      // set callback handlers
      self.client.onConnectionLost = onConnectionLost
      self.client.onMessageArrived = onMessageArrived

      // connect the client
      self.client.connect(options)

      function onConnect () {
        self.isConnected = true

        let topic = `/p1/${mac}`
        let qos = 0
        self.client.subscribe(topic, { qos: Number(qos) })
      }

      function onConnectionLost (responseObject) {
        self.isConnected = false
      }

      function onMessageArrived (message) {
        let data = message.payloadString
        data = data.replace(/[\r\n]/g, '')
        let dataArr = data.split(';')
        if (dataArr.length) {
          dataArr.forEach((val, index) => {
            if (index < dataArr.length - 1) {
              let arr = val.split('=')
              self.dataObj[arr[0]] = arr[1]
            }
          })
        }
        self.dataObj = JSON.parse(JSON.stringify(self.dataObj))
      }
    }
  }
}
</script>

<style lang="stylus">
  .page-map {
    width 100%
    height 100%
    .map-container {
      width 100%
      height calc(100% - 60px)
      #panel {
        position: relative;
        width: 300px;
        height: 500px;
        overflow: auto;
        border: 1px solid #000000;
      }
      #attributeList li {
          border-bottom: 1px dashed #999999;
          padding: 5px 5px;
          line-height: 20px;
      }
      table {
        border-collapse collapse
        border 1px solid #999
        margin-bottom 20px
      }
      th, td {
        border 1px solid #999
        padding 6px
        text-align center
      }
      .device-title {
        margin-bottom 15px
        font-size 16px
        font-weight bold
        .center-span {
          dispaly inline-block
          margin 0 30px
        }
      }
      .data-type {
        margin 5px 0
      }
      .unit {
        font-size 12px
        font-weight 500
        margin-left 2px
      }
      .flex-container {
        display flex
        justify-content space-between
      }
    }
  }
</style>
