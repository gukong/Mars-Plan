<template>
  <animation-velocity
    ref="animateRoot"
    :mouseenterWithMousedown="true"
    :mousedownAnimation="mousedownAnimation"
    :mouseupAnimation="mouseupAnimation"
    :mouseenterAnimation="mousedownAnimation"
    :mouseoutAnimation="mouseupAnimation"
    :clickAnimation="clickAnimation">
    <div class="index-plane-label-root">
      {{label}}
    </div>
  </animation-velocity>

</template>

/*********************************************/

<script>
  import { AnimationVelocity } from 'vue-animation'

  export default {
    components: {
      [AnimationVelocity.name]: AnimationVelocity
    },
    props: {
      label: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        msg: 'hello webpack',
        mousedownAnimation: [{
          animation: {scale: 0.8},
          options: {duration: 200, queue: false}
        }],
        mouseupAnimation: [{
          animation: {scale: 1},
          options: {duration: 200, queue: false}
        }],
        clickAnimation: [{
          animation: {scale: 0.9},
          options: {duration: 100}
        }, {
          animation: {scale: 1},
          options: {duration: 100}
        }]
      }
    }
  }
</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss">
  .index-plane-label-root {
    font-family: papyrus, serif;
    border: 1px solid #95989A;
    height: 80px;
    border-radius: 8px;
    color: #95989A;
    font-size: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }
</style>
