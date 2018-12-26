<template>
  <div class="device-list-page">
    <div class="page-left">
      <p class="left-title"><i class="iconfont icon-shebei"></i>设备列表</p>
      <ul>
        <li v-for="(item, index) in deviceArr" :key="index" :class="{'li-active': chooseDevice === item.mac}" @click="onChooseDevice(item)" :title="item.name"><p>{{item.name}}</p></li>
      </ul>
    </div>
    <div class="page-right">
      <div class="go-back" v-if="+userInfo.level !== 5">
        <router-link to="/admin-device"><i class="el-icon-d-arrow-left"></i>返回</router-link>
      </div>
      <div class="right-content">
        <div class="topbar">
          <div class="title">设备</div>
        </div>
        <div v-if="deviceArr.length === 0" class="empty-data">
          <p><i class="iconfont icon-kongshuju"></i></p>
          <p class="empty-txt">当前无设备数据</p>
        </div>
        <div v-else>
          <el-tabs type="border-card" v-model="activeName" @tab-click="clickTab">
            <!-- 实时数据 -->
            <el-tab-pane label="实时数据" name="realtime">
              <div class="basic-data">
                <p>
                  <span class="label">设备状态：</span>
                  <span class="value" style="color: #67C23A" v-if="deviceStatus">在线</span>
                  <span class="value" style="color: #F56C6C" v-else>离线</span>
                </p>
                <p>
                  <span class="label">经度：</span>
                  <span class="value">{{ dataObj.c }}</span>
                </p>
                <p>
                  <span class="label">纬度：</span>
                  <span class="value">{{ dataObj.d }}</span>
                </p>
              </div>
              <div class="data-container">
                <!-- 油烟 -->
                <div class="lampblack">
                  <div class="title"><i class="iconfont icon-icon-test"></i>油烟</div>
                  <div class="data-name-box">
                    <div class="data-name">
                      <p class="p-a">温度</p>
                      <p class="p-b">湿度</p>
                      <p class="p-e">油烟浓度</p>
                      <p class="p-f">颗粒物含量</p>
                      <p class="p-g">非甲烷总烃</p>
                    </div>
                  </div>
                  <div class="data-number" v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index" v-if="item < 3 || dataObj['a' + item] || dataObj['b' + item] || dataObj['e' + item] || dataObj['f' + item] || dataObj['g' + item]">
                    <div class="number">{{'0' + item}}</div>
                    <div class="data">
                      <p class="value p-a">{{dataObj['a' + item]}}<span class="unit-txt" v-if="dataObj['a' + item] || dataObj['a' + item] === 0">℃</span></p>
                      <p class="value p-b">{{dataObj['b' + item]}}<span class="unit-txt" v-if="dataObj['b' + item] || dataObj['b' + item] === 0">%</span></p>
                      <p class="value p-e">{{dataObj['e' + item]}}<span class="unit-txt" v-if="dataObj['e' + item] || dataObj['e' + item] === 0">mg/m<sup>3</sup></span></p>
                      <p class="value p-f">{{dataObj['f' + item]}}<span class="unit-txt" v-if="dataObj['f' + item] || dataObj['f' + item] === 0">mg/m<sup>3</sup></span></p>
                      <p class="value p-g">{{dataObj['g' + item]}}<span class="unit-txt" v-if="dataObj['g' + item] || dataObj['g' + item] === 0">mg/m<sup>3</sup></span></p>
                    </div>
                  </div>
                </div>
                <!-- 风机 -->
                <div class="fan">
                  <div class="title"><i class="iconfont icon-fengji"></i>风机</div>
                  <div class="data-name-box">
                    <div class="data-name">
                      <p class="p-h">状态</p>
                      <p class="p-i">电流</p>
                      <p class="p-j">频率</p>
                    </div>
                  </div>
                  <div class="data-number" v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index" v-if="item < 3 || dataObj['j' + item] || dataObj['i' + item]">
                    <div class="number">{{'0' + item}}</div>
                    <div class="data">
                      <p class="p-h">
                        <el-tag type="success" size="mini" v-if="+dataObj['h' + item] === 1">开启</el-tag>
                        <el-tag type="danger" size="mini" v-if="+dataObj['h' + item] === 0">关闭</el-tag>
                      </p>
                      <p class="value p-i">{{dataObj['i' + item]}}<span class="unit-txt" v-if="dataObj['i' + item] || dataObj['i' + item] === 0">A</span></p>
                      <p class="value p-j">{{dataObj['j' + item]}}<span class="unit-txt" v-if="dataObj['j' + item] || dataObj['j' + item] === 0">Hz</span></p>
                    </div>
                  </div>
                </div>
                <!-- 净化器 -->
                <div class="purifier">
                  <div class="title"><i class="iconfont icon-jinghuaqi"></i>净化器</div>
                  <div class="data-name-box">
                    <div class="data-name">
                      <p class="p-h">状态</p>
                      <p class="p-i">电压</p>
                      <p class="p-j">电流</p>
                    </div>
                  </div>
                  <div class="data-number" v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index" v-if="item < 3 || dataObj['m' + item] || dataObj['l' + item]">
                    <div class="number">{{'0' + item}}</div>
                    <div class="data">
                      <p class="p-h">
                        <el-tag type="success" size="mini" v-if="+dataObj['k' + item] === 1">开启</el-tag>
                        <el-tag type="danger" size="mini" v-if="+dataObj['k' + item] === 0">关闭</el-tag>
                      </p>
                      <p class="value p-i">{{dataObj['l' + item]}}<span class="unit-txt" v-if="dataObj['l' + item] || dataObj['l' + item] === 0">V</span></p>
                      <p class="value p-j">{{dataObj['m' + item]}}<span class="unit-txt" v-if="dataObj['m' + item] || dataObj['m' + item] === 0">A</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <!-- 历史数据 -->
            <el-tab-pane label="历史数据" name="history">
              <div class="history-box">
                <div class="title" style="color: #E6A23C"><i class="iconfont icon-icon-test"></i>油烟</div>
                <el-form :inline="true" class="demo-form-inline" size="mini">
                  <el-form-item label="类别：">
                    <el-select v-model="lampblackForm.type" style="width: 120px">
                      <el-option label="油烟浓度" value="e"></el-option>
                      <el-option label="颗粒物含量" value="f"></el-option>
                      <el-option label="非甲烷总烃" value="g"></el-option>
                      <el-option label="温度" value="a"></el-option>
                      <el-option label="湿度" value="b"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="路数：">
                    <el-input-number :min="1" :max="6" :step="1" v-model="lampblackForm.number" style="width: 100px"></el-input-number>
                  </el-form-item>
                  <el-form-item label="开始时间：">
                    <el-date-picker
                      v-model="lampblackForm.tsStart"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      value-format="timestamp"
                      placeholder="选择开始时间"
                      style="width: 170px">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间：">
                    <el-date-picker
                      v-model="lampblackForm.tsEnd"
                      type="datetime"
                      value-format="timestamp"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择结束时间"
                      style="width: 170px">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <div class="gradual-btn" @click="onSearch('lampblack')">查 询</div>
                  </el-form-item>
                </el-form>
                <p class="echart-title" v-if="change === 'a'">{{lampblackTitle}}(℃)</p>
                <p class="echart-title" v-else-if="change === 'b'">{{lampblackTitle}}(%)</p>
                <p class="echart-title" v-else>{{lampblackTitle}}(mg/m<sup>3</sup>)</p>
                <div class="eachart-box" id="lampblack-box"></div>
              </div>
              <div class="history-box">
                <div class="title" style="color: #409EFF"><i class="iconfont icon-fengji"></i>风机</div>
                <el-form :inline="true" class="demo-form-inline" size="mini">
                  <el-form-item label="类别：">
                    <el-select v-model="fanForm.type" style="width: 120px">
                      <!-- <el-option label="状态" value="h"></el-option> -->
                      <el-option label="电流" value="i"></el-option>
                      <el-option label="频率" value="j"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="路数：">
                    <el-input-number :min="1" :max="6" :step="1" v-model="fanForm.number" style="width: 100px"></el-input-number>
                  </el-form-item>
                  <el-form-item label="开始时间：">
                    <el-date-picker
                      v-model="fanForm.tsStart"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      value-format="timestamp"
                      placeholder="选择开始时间"
                      style="width: 170px">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间：">
                    <el-date-picker
                      v-model="fanForm.tsEnd"
                      type="datetime"
                      value-format="timestamp"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择结束时间"
                      style="width: 170px">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <div class="gradual-btn" @click="onSearch('fan')">查 询</div>
                  </el-form-item>
                </el-form>
                <p class="echart-title">{{fanTitle}}</p>
                <div class="eachart-box" id="fan-box"></div>
              </div>
              <div class="history-box">
                <div class="title" style="color: #67C23A"><i class="iconfont icon-jinghuaqi"></i>净化器</div>
                <el-form :inline="true" class="demo-form-inline" size="mini">
                  <el-form-item label="类别：">
                    <el-select v-model="purifierForm.type" style="width: 120px">
                      <!-- <el-option label="状态" value="k"></el-option> -->
                      <el-option label="电压" value="l"></el-option>
                      <el-option label="电流" value="m"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="路数：">
                    <el-input-number :min="1" :max="6" :step="1" v-model="purifierForm.number" style="width: 100px"></el-input-number>
                  </el-form-item>
                  <el-form-item label="开始时间：">
                    <el-date-picker
                      v-model="purifierForm.tsStart"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      value-format="timestamp"
                      placeholder="选择开始时间"
                      style="width: 170px">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间：">
                    <el-date-picker
                      v-model="purifierForm.tsEnd"
                      type="datetime"
                      value-format="timestamp"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择结束时间"
                      style="width: 170px">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <div class="gradual-btn" @click="onSearch('purifier')">查 询</div>
                  </el-form-item>
                </el-form>
                <p class="echart-title">{{purifierTitle}}</p>
                <div class="eachart-box" id="purifier-box"></div>
              </div>
            </el-tab-pane>

            <!-- 数据校准 -->
            <el-tab-pane label="数据校准" name="updateData" v-if="+userInfo.level !== 5">
              <div class="update-data">
                <!-- 非甲烷总烃校准 -->
                <div class="update-box">
                  <div class="title">非甲烷总烃校准</div>
                  <div class="data-number" v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index" v-if="item < 3 || dataObj['n' + item] || dataObj['o' + item]">
                    <div class="radio-box">
                      <el-button type="success" @click="showUpdateData('s', item)" size="mini" plain>校准</el-button>
                      <span class="num">{{'0' + item}}</span>
                    </div>
                    <div class="data">
                      <p>
                        <span class="label">基础数据：</span>
                        <span class="value">{{dataObj['n' + item]}}</span>
                      </p>
                      <p>
                        <span class="label">校准状态：</span>
                        <el-tag type="info" size="mini" v-if="+dataObj['o' + item] === 0">未校准</el-tag>
                        <el-tag type="success" size="mini" v-if="+dataObj['o' + item] === 1">已校准</el-tag>
                        <el-tag type="primary" size="mini" v-if="+dataObj['o' + item] === 2">正在校准</el-tag>
                        <el-tag type="danger" size="mini" v-if="+dataObj['o' + item] === 3">校准失败</el-tag>
                      </p>
                    </div>
                  </div>
                </div>
                <!-- 油烟浓度调整因子 -->
                <div class="update-box">
                  <div class="title">油烟浓度调整因子</div>
                  <div class="data-number" v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index" v-if="item < 3 || dataObj['p' + item]">
                    <div class="radio-box">
                      <el-button type="success" @click="showUpdateData('p', item)" size="mini" plain>校准</el-button>
                      <span class="num">{{'0' + item}}</span>
                    </div>
                    <div class="data data-single">
                      <p>
                        <span class="label">当前因子数：</span>
                        <span class="value">{{dataObj['p' + item]}}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <!-- 颗粒物浓调整因子 -->
                <div class="update-box">
                  <div class="title">颗粒物浓调整因子</div>
                  <div class="data-number" v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index" v-if="item < 3 || dataObj['q' + item]">
                    <div class="radio-box">
                      <el-button type="success" @click="showUpdateData('q', item)" size="mini" plain>校准</el-button>
                      <span class="num">{{'0' + item}}</span>
                    </div>
                    <div class="data data-single">
                      <p>
                        <span class="label">当前因子数：</span>
                        <span class="value">{{dataObj['q' + item]}}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <!-- 非甲烷总烃调整因子 -->
                <div class="update-box">
                  <div class="title">非甲烷总烃调整因子</div>
                  <div class="data-number" v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index" v-if="item < 3 || dataObj['r' + item]">
                    <div class="radio-box">
                      <el-button type="success" @click="showUpdateData('r', item)" size="mini" plain>校准</el-button>
                      <span class="num">{{'0' + item}}</span>
                    </div>
                    <div class="data data-single">
                      <p>
                        <span class="label">当前因子数：</span>
                        <span class="value">{{dataObj['r' + item]}}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <!-- 数据校准 -->
    <el-dialog
      :title="updateTitle"
      :visible.sync="updateVisible"
      width="500px">
      校准值：
      <el-input-number v-model="updateValue" :min="0" :max="0" v-if="updateType.indexOf('s') !== -1"></el-input-number>
      <el-input-number v-model="updateValue" :min="1" :max="1000" v-else></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="onUpdate" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deviceList, deviceHistory, deviceStatus } from '@/api/getData'
import { lineEcharts, statusEchars } from '@/assets/js/echarts'

let lampblackEchart, fanEchart, purifierEchart
let t

export default {
  data () {
    return {
      // 左侧列表
      deviceArr: [],
      chooseDevice: '',

      activeName: 'realtime',
      // 实时数据
      statusT: '',
      deviceStatus: '',
      isConnected: false,
      client: null,
      dataObj: {},
      // 历史数据
      lampblackForm: {
        number: 1,
        type: 'e',
        tsStart: +new Date() - (24 * 60 * 60 * 1000),
        tsEnd: new Date().getTime()
      },
      fanForm: {
        number: 1,
        type: 'i',
        tsStart: +new Date() - (24 * 60 * 60 * 1000),
        tsEnd: new Date().getTime()
      },
      purifierForm: {
        number: 1,
        type: 'l',
        tsStart: +new Date() - (24 * 60 * 60 * 1000),
        tsEnd: new Date().getTime()
      },
      // eachart
      lampblackData: [],
      lampblackTitle: '',
      change: '',
      fanData: [],
      fanTitle: '',
      purifierData: [],
      purifierTitle: '',
      // 校准数据
      updateType: '',
      updateTitle: '',
      updateVisible: false,
      updateValue: ''
    }
  },
  computed: {
    uid () {
      return this.$route.params.uid
    },
    devId () {
      return this.$route.params.devId
    },
    pwd () {
      return sessionStorage.getItem('pwd')
    },
    userInfo () {
      return JSON.parse(sessionStorage.getItem('user-info'))
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.client) {
      this.client.disconnect()
      this.isConnected = false
      this.client = null
    }
    if (t) {
      clearInterval(t)
      t = ''
    }
    next()
  },
  mounted () {
    this.getAllDevice()
    window.onresize = () => {
      if (lampblackEchart) {
        lampblackEchart.resize()
      }
      if (fanEchart) {
        fanEchart.resize()
      }
      if (purifierEchart) {
        purifierEchart.resize()
      }
    }
  },
  methods: {
    // 获取设备列表
    async getAllDevice () {
      const res = await deviceList({
        uid: this.uid
      })
      if (res) {
        this.deviceArr = res.dev_list
        if (this.deviceArr.length) {
          if (+this.devId !== -1) {
            this.chooseDevice = this.devId
          } else {
            this.chooseDevice = this.deviceArr[0].mac
          }
          this.getDeviceStatus()
          this.dataObj = {}
          this.connect()

          t = setInterval(() => {
            this.getDeviceStatus()
          }, 10000)
        }
      }
    },
    // 选择设备
    onChooseDevice (item) {
      this.chooseDevice = item.mac
      if (t) {
        clearInterval(t)
        t = ''
      }
      if (this.client) {
        this.client.disconnect()
        this.isConnected = false
        this.client = null
      }
      this.dataObj = {}
      this.connect()
      this.getDeviceStatus()

      t = setInterval(() => {
        this.getDeviceStatus()
      }, 10000)

      if (this.activeName === 'history') {
        this.getLampblackHistory()
        this.getFanHistory()
        this.getPurifierHistory()
      }
    },
    // 获取设备状态
    async getDeviceStatus () {
      const res = await deviceStatus({
        dev_code: this.chooseDevice
      })
      if (res) {
        this.deviceStatus = res.is_online
      }
    },
    // 获取实时数据
    connect () {
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

        let topic = `/p1/${self.chooseDevice}`
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
    },
    // 切换tab
    clickTab (tab) {
      if (tab.name === 'history') {
        this.getLampblackHistory()
        this.getFanHistory()
        this.getPurifierHistory()
      }
    },
    // 获取设备历史数据
    async getLampblackHistory () {
      if (!this.lampblackForm.tsStart || !this.lampblackForm.tsEnd || +this.lampblackForm.tsStart > +this.lampblackForm.tsEnd) {
        this.$message({
          message: '请选择有效的时间段',
          type: 'warning'
        })
        return
      }
      const res = await deviceHistory({
        dev_code: this.chooseDevice,
        data_type: this.lampblackForm.type + this.lampblackForm.number,
        ts_start: Math.floor(this.lampblackForm.tsStart / 1000),
        ts_end: Math.floor(this.lampblackForm.tsEnd / 1000)
      })
      if (res) {
        if (document.getElementById('lampblack-box')) {
          lampblackEchart = this.$echarts.init(document.getElementById('lampblack-box'))
          let title
          switch (this.lampblackForm.type) {
            case 'a':
              this.lampblackTitle = `第 ${this.lampblackForm.number} 路温度`
              this.change = 'a'
              title = '温度'
              break
            case 'b':
              this.lampblackTitle = `第 ${this.lampblackForm.number} 路湿度`
              this.change = 'b'
              title = '湿度'
              break
            case 'e':
              this.lampblackTitle = `油烟：第 ${this.lampblackForm.number} 路油烟浓度`
              this.change = 'e'
              title = '油烟浓度'
              break
            case 'f':
              this.lampblackTitle = `油烟：第 ${this.lampblackForm.number} 路颗粒物含量`
              this.change = 'f'
              title = '颗粒物含量'
              break
            default:
              this.lampblackTitle = `油烟：第 ${this.lampblackForm.number} 路非甲烷总烃`
              this.change = 'g'
              title = '甲烷总烃'
          }
          let dataArr = []
          if (res.data.length) {
            res.data.forEach(val => {
              dataArr.push([val.ts * 1000, +val.value])
            })
          }
          const option = lineEcharts('#E6A23C', title, dataArr)
          lampblackEchart.clear()
          lampblackEchart.setOption(option)
        }
      }
    },
    async getFanHistory () {
      if (!this.fanForm.tsStart || !this.fanForm.tsEnd || +this.fanForm.tsStart > +this.fanForm.tsEnd) {
        this.$message({
          message: '请选择有效的时间段',
          type: 'warning'
        })
        return
      }
      const res = await deviceHistory({
        dev_code: this.chooseDevice,
        data_type: this.fanForm.type + this.fanForm.number,
        ts_start: Math.floor(this.fanForm.tsStart / 1000),
        ts_end: Math.floor(this.fanForm.tsEnd / 1000)
      })
      if (res) {
        if (document.getElementById('fan-box')) {
          fanEchart = this.$echarts.init(document.getElementById('fan-box'))
          let title
          switch (this.fanForm.type) {
            case 'h':
              this.fanTitle = `风机：第 ${this.fanForm.number} 路状态`
              title = '状态'
              break
            case 'i':
              this.fanTitle = `风机：第 ${this.fanForm.number} 路电流(A)`
              title = '电流'
              break
            default:
              this.fanTitle = `风机：第 ${this.fanForm.number} 路频率(Hz)`
              title = '频率'
          }
          let dataArr = []
          if (res.data.length) {
            res.data.forEach(val => {
              dataArr.push([val.ts * 1000, +val.value])
            })
          }
          let option
          if (this.fanForm.type !== 'h') {
            option = lineEcharts('#409EFF', title, dataArr)
          } else {
            option = statusEchars(title, dataArr)
          }

          fanEchart.clear()
          fanEchart.setOption(option)
        }
      }
    },
    async getPurifierHistory () {
      if (!this.purifierForm.tsStart || !this.purifierForm.tsEnd || +this.purifierForm.tsStart > +this.purifierForm.tsEnd) {
        this.$message({
          message: '请选择有效的时间段',
          type: 'warning'
        })
        return
      }
      const res = await deviceHistory({
        dev_code: this.chooseDevice,
        data_type: this.purifierForm.type + this.purifierForm.number,
        ts_start: Math.floor(this.purifierForm.tsStart / 1000),
        ts_end: Math.floor(this.purifierForm.tsEnd / 1000)
      })
      if (res) {
        if (document.getElementById('purifier-box')) {
          purifierEchart = this.$echarts.init(document.getElementById('purifier-box'))
          let title
          switch (this.purifierForm.type) {
            case 'k':
              this.purifierTitle = `净化器：第 ${this.purifierForm.number} 路状态`
              title = '状态'
              break
            case 'l':
              this.purifierTitle = `净化器：第 ${this.purifierForm.number} 路电压(V)`
              title = '电压'
              break
            default:
              this.purifierTitle = `净化器：第 ${this.purifierForm.number} 路电流(A)`
              title = '电流'
          }
          let dataArr = []
          if (res.data.length) {
            res.data.forEach(val => {
              dataArr.push([val.ts * 1000, +val.value])
            })
          }
          let option
          if (this.purifierForm.type !== 'k') {
            option = lineEcharts('#67C23A', title, dataArr)
          } else {
            option = statusEchars(title, dataArr)
          }
          purifierEchart.clear()
          purifierEchart.setOption(option)
        }
      }
    },
    // 查询
    onSearch (type) {
      if (type === 'lampblack') {
        this.getLampblackHistory()
      }
      if (type === 'fan') {
        this.getFanHistory()
      }
      if (type === 'purifier') {
        this.getPurifierHistory()
      }
    },
    // 数据校准
    showUpdateData (type, num) {
      this.updateType = type + num
      if (type === 's') {
        this.updateValue = 0
        this.$confirm('此操作将校准非甲烷总烃校准, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onUpdate()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消校准'
          })
        })
      } else {
        this.updateVisible = true
        if (type === 'r') {
          this.updateTitle = '非甲烷总烃调整因子'
          this.updateValue = this.dataObj[type + num]
        }
        if (type === 'p') {
          this.updateTitle = '油烟浓度调整因子'
          this.updateValue = this.dataObj[type + num]
        }
        if (type === 'q') {
          this.updateTitle = '颗粒物浓度调整因子'
          this.updateValue = this.dataObj[type + num]
        }
      }
    },
    onUpdate () {
      const topic = `/p1/set/${this.chooseDevice}`
      const qos = 1
      let message = `${this.updateType}=${this.updateValue}`

      message = new Paho.Message(message)
      message.destinationName = topic
      message.qos = Number(qos)

      this.client.send(message)

      this.$message({
        message: '数据校准完成',
        type: 'success'
      })
      this.updateType = ''
      this.updateVisible = false
    }
  }
}
</script>

<style lang="stylus">
  .device-list-page {
    height 100%
    display flex
    justify-content space-between
    .gradual-btn {
      margin-top 2px
    }
    .page-left {
      height 100%
      overflow-y auto
      flex-grow 0
      flex-shrink 0
      width 200px
      z-index 3
      background-color #21252A
      .left-title {
        margin 30px 0
        padding-left 30px
        color #fff
        font-size 18px
        .iconfont {
          margin-right 8px
        }
      }
      ul {
        color #fff
        li {
          width 200px
          display flex
          align-items center
          cursor pointer
          padding-left 30px
          font-size 16px
          height 36px
          margin-bottom 20px
          border none
          transition border 0.2s
          p {
            width 170px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          }
        }
        .iconfont {
          margin-right 8px
          width 22px
          text-align center
          font-size 18px
          vertical-align middle
        }
        .li-active {
          color color-main !important
          background-color #fff !important
          border-left 3px solid color-main
        }
      }
    }
    .page-right {
      flex 1
      margin 20px
      overflow-y auto
      display flex
      flex-direction column
      .go-back {
        color color-main
        margin-bottom 10px
        font-size 16px
        .el-icon-d-arrow-left {
          margin-right 6px
        }
      }
      .right-content {
        padding 0 10px
        flex 1
        background-color #fff
        .empty-data {
          text-align center
          padding-top 100px
          color #999
          font-size 20px
          .icon-kongshuju {
            font-size 30px
          }
          .empty-txt {
            margin-top 20px
          }
        }
        // 实时数据
        .basic-data {
          display flex
          justify-content space-around
          padding 10px 0
          background-color #F2F6FC
          margin-bottom 20px
          p {
            width 33%
            text-align center
            font-size 18px
            .label {
              color #787878
            }
            .value {
              color #313131
              font-weight bold
            }
          }
        }
        .data-container {
          display flex
          justify-content space-between
          div {
            .title {
              color #fff
              width 100px
              text-align center
              height 30px
              line-height 30px
              margin 0 auto
              font-size 16px
              margin-bottom 10px
              .iconfont {
                font-size 16px
                font-weight bold
                margin-right 4px
              }
              .icon-icon-test {
                font-size 15px
              }
            }
            .data-number {
              width 100%
              display flex
              justify-content center
              align-items center
              padding 10px 0
              .number {
                width 25px
                text-align center
                font-size 18px
                font-weight bold
                color #C0C4CC
                border-right 1px solid #d2d2d2
              }
              .data {
                margin 0 10px
                flex 1
                display flex
                justify-content space-between
                p {
                  height 26px
                  line-height 26px
                }
                .value {
                  font-size 14px
                  font-weight bold
                }
                .unit-txt {
                  color #787878
                  font-size 13px
                  font-weight 400
                  margin-left 2px
                  sup {
                    font-size 12px
                  }
                }
              }
            }
          }
          .data-name-box {
            width 100%
            padding-left 35px
            padding-right 10px
            padding-bottom 4px
            border-bottom 1px solid #d2d2d2
            .data-name {
              width 100%
              display flex
              justify-content space-between
              p {
                font-weight bold
                color #909399
              }
            }
          }
          .lampblack {
            border 1px solid #E6A23C
            box-shadow 1px 1px 8px #E6A23C
            width 48%
            .p-a {
              width 15%
              text-align center
            }
            .p-b {
              width 15%
              text-align center
            }
            .p-e, .p-f, .p-g {
              width 23%
              text-align center
            }
            .title {
              background-color #E6A23C
            }
          }
          .fan {
            border 1px solid #409EFF
            box-shadow 1px 1px 8px #409EFF
            .title {
              background-color #409EFF
            }
          }
          .purifier {
            border 1px solid #67C23A
            box-shadow 1px 1px 8px #67C23A
            .title {
              background-color #67C23A
            }
          }
          .fan, .purifier {
            width 24%
            .p-h, .p-i, .p-j {
              width 25%
              text-align center
            }
          }
        }

        // 历史数据
        .history-box {
          width 100%
          border 1px solid #DCDFE6
          box-shadow 1px 1px 8px #DCDFE6
          padding 10px
          margin 10px 0 40px 0
          .title {
            font-size 18px
            font-weight bold
            margin-bottom 20px
            .iconfont {
              font-size 16px
              font-weight bold
              margin-right 4px
            }
            .icon-icon-test {
              font-size 15px
            }
          }
          .echart-title {
            color #313131
            font-size 14
            font-weight bold
          }
          .eachart-box {
            width 100%
            height 300px
          }
        }

        // 数据校准
        .update-data {
          display flex
          justify-content space-between
          width 100%
          height 500px
          .update-box {
            width 24%
            border 1px solid #DCDFE6
            box-shadow 1px 1px 8px #DCDFE6
            position relative
            padding-bottom 70px
            .title {
              color #fff
              width 160px
              text-align center
              height 30px
              line-height 30px
              margin 0 auto
              font-size 16px
              margin-bottom 10px
              background-color #409EFF
            }
            .data-number {
              width 100%
              height 72px
              display flex
              justify-content center
              align-items center
              padding 10px 0
              .radio-box {
                width 120px
                display flex
                align-items center
                justify-content center
                .el-button {
                  padding 5px 8px
                  margin-right 6px
                }
                .num {
                  font-size 20px !important
                  color #C0C4CC
                  font-weight bold
                }
              }
              .data {
                width 200px
                p {
                  height 26px
                  line-height 26px
                  .label {
                    color #787878
                    font-size 15px
                  }
                  .value {
                    font-size 18px
                    font-weight bold
                  }
                }
              }
              .data-single {
                p {
                  height 30px
                  line-height 26px
                }
              }
            }
          }
        }
      }
    }
  }
</style>
