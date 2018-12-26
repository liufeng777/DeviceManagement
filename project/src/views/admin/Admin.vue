<template>
  <div class="content-page">
    <div class="page-left">
      <ul>
        <router-link to="/admin">
          <!-- <li > -->
          <li :class="{'li-active': fullPath === '/admin'}">
            <i class="iconfont icon-yonghuguanli"></i>
            <span slot="title">人员管理</span>
          </li>
        </router-link>
        <router-link to="/device-map">
          <li :class="{'li-active': fullPath === '/device-map'}">
            <i class="iconfont icon-ditu2"></i>
            <span slot="title">设备分布</span>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="page-right">
      <transition name="slide-fade">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    fullPath () {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="stylus">
.content-page {
  height 100%
  display flex
  justify-content space-between
  .page-left {
    height 100%
    overflow-y auto
    flex-grow 0
    flex-shrink 0
    width 200px
    z-index 3
    background-color #21252A
    ul {
      color #fff
      margin-top 30px
      li {
        display flex
        align-items center
        cursor pointer
        padding-left 30px
        font-size 16px
        height 36px
        margin-bottom 20px
        border none
        transition border 0.2s
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
    padding 0 10px
    background-color #fff
    overflow-y auto
  }
}
</style>
