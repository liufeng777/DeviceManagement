<template>
  <div class="user-page">
    <div class="topbar">
      <div class="title">人员管理</div>
      <div class="gradual-btn" @click="showAdd">
        <span>新增人员</span>
      </div>
    </div>
    <p class="admin-choose" @click="goInitList">
      <span class="choose-back" v-if="choose.uid !== userInfo.uid"><i class="el-icon-d-arrow-left"></i> 返回</span>
      <span class="choose-name">当前：{{choose.name}} ({{level}})</span>
    </p>

    <!-- 超级管理员 -->
    <div class="table-user-all" v-if="+choose.level === 1">
      <p class="table-title"><i class="iconfont icon-icon-408004712"></i>管理员列表</p>
      <el-table
        :data="tableAdmin"
        border
        style="width: 100%"
        size="mini">
        <el-table-column
          label="姓名"
          prop="name"
          min-width="80px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="手机"
          prop="tel"
          min-width="100px">
        </el-table-column>
        <el-table-column
          label="地址"
          prop="addr"
          min-width="80px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="corp"
          label="公司名称"
          min-width="80px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="servers"
          label="服务人员"
          min-width="80px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="level"
          label="类型"
          min-width="90px">
          <template slot-scope="scope">
            <span v-if="+scope.row.level === 2">一级管理员</span>
            <span v-if="+scope.row.level === 3">二级管理员</span>
            <span v-if="+scope.row.level === 4">三级管理员</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260px" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="mini" @click="onDelete(scope.row)">删除</el-button>
            <el-button type="warning" plain size="mini" @click="checkUser(scope.row)">查看人员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 一级、二级管理员 -->
    <div class="table-container" v-if="+choose.level !== 1 && +choose.level !== 4">
      <!-- table -->
      <div class="table-admin">
        <p class="table-title"><i class="iconfont icon-icon-408004712"></i>管理员列表</p>
        <el-table
          :data="tableAdmin"
          border
          style="width: 100%"
          size="mini">
          <el-table-column
            label="姓名"
            prop="name"
            min-width="80px"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="手机"
            prop="tel"
            min-width="100px">
          </el-table-column>
          <el-table-column
            label="地址"
            prop="addr"
            min-width="80px"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="corp"
            label="公司名称"
            min-width="80px"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="servers"
            label="服务人员"
            min-width="80px"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="level"
            label="类型"
            width="90px">
            <template slot-scope="scope">
              <span v-if="+scope.row.level === 2">一级管理员</span>
              <span v-if="+scope.row.level === 3">二级管理员</span>
              <span v-if="+scope.row.level === 4">三级管理员</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" @click="showEdit(scope.row)">编辑</el-button>
              <el-button type="danger" plain size="mini" @click="onDelete(scope.row)">删除</el-button>
              <el-button type="warning" plain size="mini" @click="checkUser(scope.row)">查看人员</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- table -->
      <div class="table-user">
        <p class="table-title"><i class="iconfont icon-icon-408004712"></i>用户列表</p>
        <el-table
          :data="tableUser"
          border
          style="width: 100%"
          size="mini"
          >
          <el-table-column
            label="姓名"
            prop="name"
            min-width="80px"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="手机"
            prop="tel"
            min-width="100px">
          </el-table-column>
          <el-table-column
            label="地址"
            prop="addr"
            min-width="80px"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="corp"
            label="公司名称"
            min-width="80px"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="servers"
            label="服务人员"
            min-width="80px"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="level"
            label="类型"
            width="70px">
            <template slot-scope="scope">
              <span>普通用户</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="85px"
            fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain @click="goToDevice(scope.row)">查看设备</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 三级管理员 -->
    <div class="table-user-all" v-if="+choose.level === 4">
      <p class="table-title"><i class="iconfont icon-icon-408004712"></i>用户列表</p>
      <el-table
        :data="tableUser"
        border
        style="width: 100%"
        size="mini">
        <el-table-column
          label="姓名"
          prop="name"
          min-width="80px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="手机"
          prop="tel"
          min-width="100px">
        </el-table-column>
        <el-table-column
          label="地址"
          prop="addr"
          min-width="80px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="corp"
          label="公司名称"
          min-width="80px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="servers"
          label="服务人员"
          min-width="80px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="level"
          label="类型"
          min-width="70px">
          <template slot-scope="scope">
            <span>普通用户</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280px" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" plain @click="goToDevice(scope.row)">查看设备</el-button>
            <el-button type="danger" plain size="mini" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- add or edit -->
    <el-dialog
      :title="operateTitle"
      :visible.sync="dialogVisible"
      width="500px"
      v-if="dialogVisible">
      <el-form :model="operateForm" :rules="rules" ref="operateForm" label-width="80px" class="demo-ruleForm" size="small">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="operateForm.name" style="width: 280px" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="operateForm.tel" style="width: 280px" placeholder="请输入手机"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="level">
          <el-select v-model="operateForm.level" style="width: 280px" placeholder="请选择类型" :disabled="operateType !== 'add'">
            <!-- <el-option label="超级管理员" :value="1"></el-option> -->
            <el-option label="一级管理员" :value="2" v-if="+userInfo.level < 2"></el-option>
            <el-option label="二级管理员" :value="3" v-if="+userInfo.level < 3"></el-option>
            <el-option label="三级管理员" :value="4" v-if="+userInfo.level < 4"></el-option>
            <el-option label="普通用户" :value="5" v-if="+userInfo.level !== 1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="operateForm.addr" style="width: 280px" placeholder="请输入所在地址"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="corp">
          <el-input v-model="operateForm.corp" style="width: 280px" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="服务人员" prop="servers">
          <el-input v-model="operateForm.servers" style="width: 280px" placeholder="请输入服务人员"></el-input>
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
import { userList, userAdd, userEdit, userDel } from '@/api/getData'

export default {
  data () {
    return {
      // 当前
      choose: {},
      // table
      tableAdmin: [],
      tableUser: [],
      chooseAdmin: '',
      // 编辑
      operateTitle: '',
      dialogVisible: false,
      operateType: '',
      operateForm: {
        name: '',
        tel: '',
        level: '',
        addr: '',
        corp: '',
        servers: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择用户类型', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    userInfo () {
      return JSON.parse(sessionStorage.getItem('user-info'))
    },
    level () {
      switch (+this.choose.level) {
        case 1:
          return '超级管理员'
        case 2:
          return '一级管理员'
        case 3:
          return '二级管理员'
        case 4:
          return '三级管理员'
      }
    }
  },
  mounted () {
    this.choose = {...this.userInfo}
    this.getTableUser()
  },
  methods: {
    // 返回最初
    goInitList () {
      this.choose = {...this.userInfo}
      this.getTableUser()
    },
    // 获取列表
    async getTableUser () {
      const res = await userList({
        admin_uid: this.choose.uid
      })
      if (res) {
        this.tableAdmin = []
        this.tableUser = []
        if (+this.choose.level === 1) {
          this.tableAdmin = res.user_list
        }
        if (+this.choose.level === 4) {
          this.tableUser = res.user_list
        }
        if (+this.choose.level !== 1 && +this.choose.level !== 4) {
          if (res.user_list.length) {
            res.user_list.forEach(val => {
              if (+val.level === 5) {
                this.tableUser.push(val)
              } else {
                this.tableAdmin.push(val)
              }
            })
          }
        }
      }
    },
    // 添加
    showAdd () {
      this.operateTitle = '新增人员'
      this.dialogVisible = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        tel: '',
        level: '',
        addr: '',
        corp: '',
        servers: ''
      }
    },
    // 编辑
    showEdit (row) {
      if (+this.userInfo.level === 4) {
        this.operateTitle = '编辑用户'
      } else {
        this.operateTitle = '编辑管理员'
      }
      this.dialogVisible = true
      this.operateType = 'edit'
      this.operateForm = {...row}
    },
    // 提交
    onSubmit () {
      this.$refs.operateForm.validate(async (valid) => {
        if (valid) {
          const operate = this.operateType === 'add' ? userAdd : userEdit
          let params = {}
          if (this.operateType === 'add') {
            params = {
              user: {
                ...this.operateForm,
                password: this.$md5(this.operateForm.tel),
                admin_uid: this.userInfo.uid
              }
            }
          } else {
            params = {
              uid: this.operateForm.uid,
              user: {
                ...this.operateForm
              }
            }
          }
          const res = await operate(params)
          if (res) {
            let message
            if (this.operateType === 'add') {
              message = '操作成功！新增人员登录密码默认为手机号'
            } else {
              message = '操作成功!'
            }
            this.$message({
              type: 'success',
              message: message,
              duration: 5000
            })
            this.dialogVisible = false
            this.getTableUser()
          }
        } else {
          return false
        }
      })
    },
    // 删除
    onDelete (row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await userDel({
          uid: row.uid
        })
        if (res) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          if (+this.userInfo.level === 1) {
            this.getTableAdmin()
          } else {
            this.getTableUser()
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 查看用户
    async checkUser (row) {
      this.choose = row
      this.getTableUser()
    },
    goToDevice (row) {
      sessionStorage.setItem('admin-info', JSON.stringify(this.choose))
      sessionStorage.setItem('search-form', JSON.stringify({
        admin_uid: this.choose.uid,
        user_uid: row.uid
      }))
      this.$router.push('/admin-device')
    }
  }
}
</script>

<style lang="stylus">
  .user-page {
    .gradual-btn {
      margin-top 2px
    }
    .admin-choose {
      padding-bottom 10px
      margin-bottom 20px
      border-bottom 1px solid #f2f2f2
      .choose-back {
        color #909399
        cursor pointer
        margin-right 20px
        &:hover {
          color #313131
        }
      }
      .choose-name {
        color #409EFF
        display inline-block
        font-weight bold
      }
    }
    .table-container {
      width 100%
      display flex
      justify-content space-between
      .el-button {
        padding 7px 8px
      }
      .table-admin {
        width 52%
      }
      .table-user {
        width 46%
      }
      .empty-msg {
        font-size 16px
        color #999
        margin-top 10px
        .el-icon-warning {
          margin-right 5px
        }
      }
      .choose-admin {
        background oldlace
      }
    }
    .table-title {
      padding-bottom 10px
      font-weight bold
      .iconfont {
        margin-right 6px
        color color-main
      }
    }
  }
</style>
