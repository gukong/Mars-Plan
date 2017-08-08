<template>
  <div class="bubble-root">
    <canvas id="bubble" :width="width" :height="height"></canvas>
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
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight
      this.$nextTick(() => {
        drawBubble(document, this.width, this.height)
      })
    }
  }

  const BASE_WIDTH = 118
  const BASE_HEIGHT = 151
  function drawBubble(document, width, height) {
    const canvas = document.getElementById('bubble')
    if (!canvas.getContext) {
      return
    }
    const scaleRateX = width / BASE_WIDTH
    const scaleRateY = height / BASE_HEIGHT
    const ctx = canvas.getContext('2d')

    // 从 XD 导出的 svg 文件获取内容
    const p = new Path2D(`M7.428,${150 * scaleRateY}a7.5,7.5,0,0,1-7.5-7.5V22.537L-8.94,19.209a1.5,1.5,0,0,1,0-2.121l8.868-4V8A7.5,7.5,0,0,1,7.428.5h${102 * scaleRateX} a7.5,7.5,0,0,1,7.5,7.5V${146 * scaleRateY}a7.5,7.5,0,0,1-7.5,7.5Z`)
    ctx.fillStyle = '#EFB6B6'
    ctx.translate(10, 0)
    ctx.fill(p)
  }

</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss">
  .bubble-root {
  }
</style>
