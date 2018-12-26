<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="home-top">
      <!-- logo -->
      <div class="logo">
        <!-- <div class="logo-img">
        </div> -->
        <div class="logo-txt">
          <router-link to="/admin" v-if="+userInfo.level !== 5"><p class="logo-txt-c">设备管理平台</p></router-link>
          <p class="logo-txt-c" v-else>设备管理平台</p>
        </div>
      </div>

      <!-- 人员信息 -->
      <div class="nav">
        <li class="nav-item">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <span class="user-name">{{userInfo.name}}</span>
              <i class="iconfont icon-admin"></i>
              <!-- {{userInfo.user || ''}}<i class="el-icon-caret-bottom"></i> -->
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="modifyPassword">修改密码</el-dropdown-item>
              <el-dropdown-item divided command="logout">退出账号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <!-- <li class="nav-item" @click="onLogout">
          <i class="iconfont icon-tuichu"></i>
        </li> -->
      </div>
    </div>

    <!-- 侧边导航 -->
    <!-- <div class="home-left">
      <sidebar />
    </div> -->

    <!-- 主体部分 -->
    <div class="home-content">
      <transition name="slide-fade">
        <router-view/>
      </transition>
    </div>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible" v-if="dialogVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
        <el-form-item label="旧密码：" prop="old_pwd">
          <el-input type="password" v-model.trim="form.old_pwd" placeholder="请输入旧密码" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="new_pw">
          <el-input type="password" v-model.trim="form.new_pw" placeholder="请输入新密码" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="re_pwd">
          <el-input type="password" v-model.trim="form.re_pwd" placeholder="请确认新密码" style="width: 280px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onModifyPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userChangePwd } from '@/api/getData'

export default {
  data () {
    const checkPwdNew = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认新密码'))
      } else if (value !== this.form.new_pw) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        old_pwd: '',
        new_pw: '',
        re_pwd: ''
      },
      dialogVisible: false,
      t: '',
      rules: {
        old_pwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }, {
          pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,32}$/, message: '6-32位字符，数字、大小写字母和特殊字符至少包含2种', trigger: 'blur'}],
        new_pw: [{ required: true, message: '请输入新密码', trigger: 'blur' }, {
          pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,32}$/, message: '6-32位字符，数字、大小写字母和特殊字符至少包含2种', trigger: 'blur'}],
        re_pwd: [{ required: true, validator: checkPwdNew, trigger: 'blur' }]
      }
    }
  },
  computed: {
    userInfo () {
      return JSON.parse(sessionStorage.getItem('user-info'))
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'modifyPassword') {
        this.dialogVisible = true
        this.form = {}
      }
      if (command === 'logout') {
        this.onLogout()
      }
    },
    // 登出
    onLogout () {
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.clear()
        this.$message({
          message: '退出成功！',
          type: 'success'
        })
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 修改密码
    onModifyPassword () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await userChangePwd({
            uid: this.userInfo.uid,
            old_pw: this.$md5(this.form.old_pw),
            new_pw: this.$md5(this.form.new_pw)
          })
          if (res) {
            this.dialogVisible = false
            this.$message({
              message: '修改密码成功，请重新登录！',
              type: 'success'
            })
            this.$router.push('/login')
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus">
  .home-page {
    height 100%
    color color-text-primary
    .home-top {
      position fixed
      top 0
      left 0
      height 50px
      width 100%
      background-color color-black
      color #fff
      display flex
      justify-content space-between
      align-items center
      padding 0 20px
      z-index 1001
      border-bottom 1px solid #787878
      .logo {
        display flex
        justify-content flex-start
        align-items center
        cursor pointer
        .icon-logo {
          font-size 46px
        }
        .logo-txt {
          p {
            margin 0
          }
          .logo-txt-c {
            font-size 20px
          }
        }
      }
      .nav {
        display flex
        justify-content space-between
        align-items center
        // .home {
        //   .el-dropdown-link {
        //     display flex
        //     align-items center
        //   }
        // }
        .nav-item {
          cursor pointer
          margin-left 30px
          margin-right 10px
        }
        .user-name {
          color #fff
          margin-right 10px
        }
        .icon-admin {
          font-size 20px
          font-weight bold
          color #fff
        }
        .el-icon-caret-bottom {
          color #fff
        }
      }
    }
    .home-content {
      height 100%
      padding-top 50px
      background-color color-bg
      overflow-y auto
      .el-table thead tr th{
        background-color color-gray !important
      }
    }
  }
</style>
