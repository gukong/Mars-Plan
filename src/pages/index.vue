<template>
  <div class="index-page-root">
    <img src="../assets/logo.png">
    <div class="plane-container">
      <plane-label
        v-for="(item, index) in labelConfig" :label="item.label"
        :key="index"
        class="plane-label"
        @click.native="openPages(item.routerName)">
      </plane-label>
      <loading-component></loading-component>
    </div>
  </div>
</template>

<script>
  import PlaneLabel from './index/plane-label'
  const LoadingComponent = () => import('@/components/loading' /* webpackChunkName: "Loading" */)

  export default {
    name: 'hello',
    components: {
      PlaneLabel,
      LoadingComponent
    },
    data() {
      return {
        labelConfig: [{
          label: 'svg',
          routerName: ''
        }, {
          label: 'iconfont',
          routerName: ''
        }, {
          label: 'animate',
          routerName: ''
        }, {
          label: 'canvas',
          routerName: 'canvas'
        }]
      }
    },
    methods: {
      openPages(routerName) {
        setTimeout(() => {
          this.$router.push({name: routerName})
        }, 200)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .index-page-root {
    img {
      width: 160px;
      height: 160px;
      border-radius: 50%;
    }
    .plane-container {
      display: flex;
      justify-content: center;
      margin-top: 110px;
      .plane-label {
        margin: 0 10px;
      }
    }
    .demo {
      height: 400ex;
    }
  }
</style>
