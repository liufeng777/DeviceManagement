<template>
  <div class="device-page">
    <div class="topbar">
      <div class="title">
        <span class="last-page" @click="goToUser">人员管理</span>
        <span class="line">/</span>
        <span>设备管理</span>
      </div>
      <div class="gradual-btn" @click="showAdd" v-if="searchForm.user_uid">
        <span>新增设备</span>
      </div>
    </div>
    <!-- search form -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
      <el-form-item label="管理员：">
        <el-select v-model="searchForm.admin_uid" filterable placeholder="请选择 (可按名称检索)" @change="changeAdmin" disabled>
          <!-- <el-option
            v-for="item in adminArr"
            :key="item.uid"
            :label="item.name"
            :value="item.uid">
          </el-option> -->
          <el-option :label="adminInfo.name" :value="adminInfo.uid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户：">
        <el-select v-model="searchForm.user_uid" filterable placeholder="请选择 (可按名称检索)" :disabled="!searchForm.admin_uid">
          <el-option
            v-for="item in userArr"
            :key="item.uid"
            :label="item.name"
            :value="item.uid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="gradual-btn" @click="onSearch">查 询</div>
      </el-form-item>
    </el-form>

    <p style="marginBottom: 14px">
      <span style="color: #F56C6C">*</span>
      <span class="search-info" v-if="+userInfo.level === 1">请先选择管理员和用户后再查询结果</span>
      <span class="search-info" v-else>请先选择用户后再查询结果</span>
    </p>

    <!-- table -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      size="small">
      <el-table-column
        label="名称"
        prop="name"
        min-width="100px"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="设备ID"
        prop="mac"
        min-width="100px"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="经度"
        prop="longitude">
      </el-table-column>
      <el-table-column
        prop="latitude"
        label="纬度">
      </el-table-column>
      <el-table-column label="操作" width="260px">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="showEdit(scope.row)">编辑</el-button>
          <el-button type="primary" plain size="mini" @click="goToDeviceData(scope.row)">查看数据</el-button>
          <el-button type="danger" plain size="mini" @click="onDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- add or edit -->
    <el-dialog
      :title="operateTitle"
      :visible.sync="dialogVisible"
      width="500px"
      v-if="dialogVisible">
      <el-form :model="operateForm" :rules="rules" ref="operateForm" label-width="90px" class="demo-ruleForm" size="small">
        <el-form-item label="用户：">
          <span>{{userName}}</span>
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="operateForm.name" style="width: 280px" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID：" prop="mac">
          <el-input v-model="operateForm.mac" style="width: 280px" placeholder="请输入设备ID"></el-input>
        </el-form-item>
        <el-form-item label="经度：">
          <el-input-number :min="-180" :max="180" v-model="operateForm.longitude"></el-input-number>
        </el-form-item>
        <el-form-item label="纬度：">
          <el-input-number :min="-90" :max="90" v-model="operateForm.latitude"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="onSubmit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userList, deviceList, deviceAdd, deviceEdit, deviceDel } from '@/api/getData'

export default {
  data () {
    return {
      searchForm: {
        admin_uid: '',
        user_uid: ''
      },
      adminArr: [],
      userArr: [],
      // table
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // add or edit
      userName: '',
      operateTitle: '',
      dialogVisible: false,
      operateType: '',
      operateForm: {
        name: '',
        mac: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        mac: [
          { required: true, message: '请输入设备MAC地址', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    userInfo () {
      return JSON.parse(sessionStorage.getItem('user-info'))
    },
    uid () {
      return this.$router.params.uid
    },
    adminInfo () {
      return JSON.parse(sessionStorage.getItem('admin-info'))
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   if (from.path.split('/')[1] !== 'device-list' && from.path.split('/')[1] !== 'user-list') {
  //     sessionStorage.removeItem('search-form')
  //   }
  //   next()
  // },
  beforeRouteLeave (to, from, next) {
    if (to.path.split('/')[1] !== 'device-list') {
      sessionStorage.removeItem('search-form')
    }
    next()
  },
  // created () {
  //   if (+this.userInfo.level === 4) {
  //     this.searchForm.admin_uid = this.userInfo.uid
  //     this.getAllUser(this.searchForm.admin_uid)
  //   } else {
  //     this.getAllAdmin()
  //   }
  //   this.getAllUser()
  // },
  mounted () {
    if (sessionStorage.getItem('search-form')) {
      this.searchForm = JSON.parse(sessionStorage.getItem('search-form'))
      this.$nextTick(() => {
        this.getAllUser(this.searchForm.admin_uid)
        this.getTableData()
      })
    }
  },
  methods: {
    // 获取所有的管理员
    // async getAllAdmin () {
    //   const res = await userList({
    //     admin_uid: this.userInfo.uid
    //   })
    //   if (res) {
    //     this.adminArr = []
    //     if (+this.userInfo.level !== 1) {
    //       this.adminArr.push(this.userInfo)
    //     }
    //     if (res.user_list.length) {
    //       res.user_list.forEach(val => {
    //         if (+val.level !== 5) {
    //           this.adminArr.push(val)
    //         }
    //       })
    //     }
    //   }
    // },
    goToUser () {
      this.$router.push('/admin')
    },
    // 获取所有的用户
    async getAllUser (uid) {
      const res = await userList({
        admin_uid: uid
      })
      if (res) {
        this.userArr = []
        res.user_list.forEach(val => {
          if (+val.level === 5) {
            this.userArr.push(val)
          }
        })
      }
    },
    // 切换管理员
    changeAdmin (val) {
      this.searchForm.user_uid = ''
      this.getAllUser(val)
    },
    // 查询
    onSearch () {
      if (!this.searchForm.user_uid) {
        this.$message({
          message: '请先选择用户后再查询结果',
          type: 'warning'
        })
        return
      }
      this.getTableData()
    },
    // 获取列表
    async getTableData () {
      const res = await deviceList({
        uid: this.searchForm.user_uid
      })
      if (res) {
        this.tableData = res.dev_list
      }
    },
    // 添加
    showAdd () {
      this.operateTitle = '新增设备'
      this.dialogVisible = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        mac: ''
      }
      if (this.userArr.length && this.searchForm.user_uid) {
        this.userArr.forEach((val) => {
          if (val.uid === this.searchForm.user_uid) {
            this.userName = val.name
          }
        })
      }
    },
    // 编辑
    showEdit (row) {
      this.operateTitle = '编辑设备'
      this.dialogVisible = true
      this.operateType = 'edit'
      this.operateForm = {...row}
      if (this.userArr.length && this.searchForm.user_uid) {
        this.userArr.forEach((val) => {
          if (val.uid === this.searchForm.user_uid) {
            this.userName = val.name
          }
        })
      }
    },
    // 提交
    onSubmit () {
      this.$refs.operateForm.validate(async (valid) => {
        if (valid) {
          const operate = this.operateType === 'add' ? deviceAdd : deviceEdit
          let params
          if (this.operateType === 'add') {
            params = {
              uid: this.searchForm.user_uid,
              dev: {
                ...this.operateForm
              }
            }
          } else {
            params = {
              id: this.operateForm.id,
              dev: {
                ...this.operateForm
              }
            }
          }
          const res = await operate(params)
          if (res) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.dialogVisible = false
            this.getTableData()
          }
        } else {
          return false
        }
      })
    },
    // 删除
    onDelete (row) {
      this.$confirm('此操作将删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deviceDel({
          id: row.id
        })
        if (res) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getTableData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 查看设备数据
    goToDeviceData (row) {
      sessionStorage.setItem('search-form', JSON.stringify(this.searchForm))
      this.$router.push(`/device-list/${this.searchForm.user_uid}/${row.mac}`)
    }
  }
}
</script>

<style lang="stylus">
  .device-page {
    .gradual-btn {
      margin-top 2px
    }
    .last-page, .line {
      color #909399
      cursor pointer
    }
    .line {
      margin 5px
    }
  }
</style>
