<template>
  <transition name="slide-fade">
    <div class="login-page">
        <div class="logo-txt">设备管理平台</div>
        <div class="login-form">
          <!-- 账号密码登录 -->
          <div>
            <p class="login-title">登 录</p>
            <div class="form-item">
              <label for="name">
                <i class="iconfont icon-zhanghao"></i>
              </label>
              <el-input id="name" placeholder="请输入手机" v-model.trim="form.tel" @keyup.enter.native="onLogin"></el-input>
            </div>
            <div class="form-item">
              <label for="password">
                <i class="iconfont icon-mima"></i>
              </label>
              <el-input type="password" id="password" placeholder="请输入密码" v-model.trim="form.password" @keyup.enter.native="onLogin"></el-input>
            </div>
            <div class="btn-login" @click="onLogin">登  录</div>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
import { userLogin } from '@/api/getData'

export default {
  data () {
    return {
      form: {}
    }
  },
  mounted () {
    sessionStorage.clear()
  },
  methods: {
    // 登录
    async onLogin () {
      const res = await userLogin({
        tel: this.form.tel,
        password: this.$md5(this.form.password)
      })
      if (res) {
        sessionStorage.setItem('token', res.token)
        sessionStorage.setItem('pwd', this.form.password)
        sessionStorage.setItem('user-info', JSON.stringify(res.user))

        this.$message({
          message: '登录成功',
          type: 'success'
        })

        if (+res.user.level === 5) {
          this.$router.push(`/device-list/${res.user.uid}/-1`)
        } else {
          this.$router.push('/admin')
        }
      }
    }
  }
}
</script>

<style lang="stylus">
  .login-page {
    height 100%
    background-image url('../assets/images/login-bg.png')
    background-size cover
    display flex
    align-items center
    justify-content space-around
    .logo-txt {
      color #fff
      font-size 50px
      letter-spacing 2px
    }
    .login-form {
      background-color #fff
      width 360px
      height 340px
      padding 20px 30px
      .login-title {
        color color-main
        font-size 16px
      }
      .form-item {
        min-height 40px
        padding-left 10px
        display flex
        align-items center
        margin-top 30px
        border-radius 5px
        border 1px solid #f2f2f2
        background-color #fff
        box-shadow -4px 4px 8px lighten(color-main, 70%)
        label {
          padding-right 10px
          .iconfont {
            font-size 20px
          }
        }
        input {
          background-color transparent
          outline none
          border none
          border-radius: 0
          box-shadow none
          transition all 0.3s
          font-size 18px
          &::-webkit-input-placeholder {
            color #bcbcbc
            font-size 14px
          }
        }
      }
      .btn-login {
        background-color color-main
        text-align center
        color #fff
        padding 10px
        margin-top 60px
        font-size font-size-large
        cursor pointer
        border-radius 5px
        box-shadow -4px 4px 8px lighten(color-main, 50%)
      }
    }
  }
</style>
