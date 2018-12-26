<template>
  <div class="c-topbar">
    <div class="title">{{title}}</div>
    <div class="gradual-btn" v-if="JSON.stringify(item) !== '{}'" @click="onClick">
      <router-link v-if="item.routerLink" :to="item.routerLink">
        <span>{{item.name}}</span>
      </router-link>
      <span v-else>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    onClick: {
      type: Function,
      default: () => {
        return false
      }
    }
  }
}
</script>

<style lang="stylus">
  .c-topbar {
    display flex
    justify-content space-between
    height 40px
    align-items center
    border-bottom border-styl
    margin-bottom 20px
    .title {
      font-size 16px
      height 20px
      line-height 20px
      padding-left 8px
      border-left 4px solid color-main
    }
    .gradual-btn {
      background-color color-main
      span {
        display inline-block
        width 100%
        height 100%
      }
    }
  }
</style>
