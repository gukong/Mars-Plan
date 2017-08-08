<template>
  <div class="smile-root">
    <canvas id="smile" :width="width" :height="height"></canvas>
  </div>
</template>

/*********************************************/

<script>
  export default {
    data() {
      return {
        width: 250,
        height: 250
      }
    },
    mounted() {
      this.width = this.$el.clientHeight
      this.height = this.$el.clientWidth
      this.$nextTick(() => {
        drawSmile(document, Math.min(this.width, this.height))
      })
    }
  }

  const BASE_SIZE = 150
  function drawSmile(document, size) {
    const canvas = document.getElementById('smile')
    if (!canvas.getContext) {
      return
    }
    const scaleRate = size / BASE_SIZE
    const ctx = canvas.getContext('2d')

    /* 嘴 */
    ctx.beginPath()
    ctx.fillStyle = 'rgb(0, 0, 200)'
    ctx.arc(75 * scaleRate, 60 * scaleRate, 50 * scaleRate, 0, 2 * Math.PI)
    ctx.fill()

    ctx.globalCompositeOperation = 'source-out'
    ctx.beginPath()
    ctx.fillStyle = '#DB9191'
    ctx.arc(75 * scaleRate, 90 * scaleRate, 35 * scaleRate, 0, 2 * Math.PI)
    ctx.fill()

    /* 头 */
    ctx.globalCompositeOperation = 'destination-over'
    ctx.beginPath()
    ctx.fillStyle = 'rgba(100,0,0,0.1)'
    ctx.arc(75 * scaleRate, 75 * scaleRate, 74 * scaleRate, 0, 2 * Math.PI)
    ctx.fill()

    /* 眼 */
    ctx.globalCompositeOperation = 'source-over'
    ctx.beginPath()
    ctx.fillStyle = '#71B79C'
    ctx.arc(50 * scaleRate, 50 * scaleRate, 20 * scaleRate, 0, 2 * Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = '#71B79C'
    ctx.arc(100 * scaleRate, 50 * scaleRate, 20 * scaleRate, 0, 2 * Math.PI)
    ctx.fill()
  }
</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss">
  .smile-root {
  }
</style>
