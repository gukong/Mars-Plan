<template>
  <div class="canvas-root">
    <h1>canvas</h1>
    <div class="container">
      <smile class="smile"></smile>
      <bubble class="bubble"></bubble>
      <paper-demo class="paper-demo"></paper-demo>
    </div>
  </div>
</template>

/*********************************************/

<script>
  import Smile from './components/smile'
  import Bubble from './components/bubble'
  import PaperDemo from './components/paper-demo/index'

  export default {
    components: {
      Smile,
      Bubble,
      PaperDemo
    },
    data() {
      return {
        msg: 'hello webpack'
      }
    }
  }
</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss" scoped>
  .canvas-root {
    h1 {
      font-family: papyrus, serif;
      font-size: 100px;
    }
  }

  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .smile {
      width: 250px;
      height: 250px;
    }
    .bubble {
      width: 200px;
      height: 250px;
    }
    .paper-demo {
      width: 800px;
      height: 800px;
      border: 2px solid gainsboro;
    }
  }
</style>
