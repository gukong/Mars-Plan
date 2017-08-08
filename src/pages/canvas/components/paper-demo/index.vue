<template>
    <div>
      <canvas id="paper-canvas"></canvas>
    </div>
</template>

/*********************************************/

<script>
  import paper from 'paper'
  import Ball from './ball'

  const {Point, Size} = paper
  export default {
    data() {
      return {
        width: 250,
        height: 250,
        balls: []
      }
    },
    mounted() {
      paper.setup('paper-canvas')
      paper.view.viewSize = new Size(this.$el.clientWidth, this.$el.clientWidth)

      for (let i = 0; i < 100; i++) {
        const center = new Point(Math.random() * paper.view.size.width, Math.random() * paper.view.size.height)
        const ball = new Ball(center, 15)
        ball.draw()
        this.balls.push(ball)
      }

      paper.view.onFrame = () => {
        this.balls.forEach((ball) => {
          ball.animate()
        })
      }
    }
  }
</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss">

</style>
