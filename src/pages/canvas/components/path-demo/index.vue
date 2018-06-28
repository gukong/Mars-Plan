<template>
  <div>
    <canvas id="path-canvas"></canvas>
  </div>
</template>

/*********************************************/

<script>
  import paper from 'paper'
  import Boid from './boid'

  const {Point, Path, Size, Segment} = paper
  export default {
    data() {
      return {
        msg: 'hello webpack',
        amount: 10,
        vector: new Point(3, 3),
        count: 5
      }
    },
    mounted() {
      const width = this.$el.clientWidth
      const height = this.$el.clientWidth
      paper.setup('path-canvas')
      paper.view.viewSize = new Size(width, height)

      const boids = []

      // Add the boids:
      for (let i = 0; i < 2; i++) {
        const position = Point.random().multiply(1200)
        boids.push(new Boid(position, 10))
      }

      paper.view.onFrame = () => {
        for (let i = 0, l = boids.length; i < l; i++) {
          boids[i].run()
        }
      }

      paper.view.onKeyDown = (event) => {
        if (event.key === 'space') {
          const layer = paper.project.activeLayer
          layer.selected = !layer.selected
          return false
        }
      }

      const po = new Point(40, 40)
      po.add(5)
      console.log('po', po)
    }
  }
</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss">

</style>
