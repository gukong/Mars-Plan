<template>
    <div>
      <canvas id="paper-canvas"></canvas>
      <img id="xiaojing" src="../../../../assets/xiaojing.png"/>
    </div>
</template>

/*********************************************/

<script>
  import paper from 'paper'
  import Ball from './ball'

  const {Point, Size, Raster, Group} = paper
  export default {
    data() {
      return {
        width: 250,
        height: 250,
        balls: [],
        wanderTheta: 0,
        oldPositionL: null,
        oldPositionR: null,
        closeEye: false,
        closeEyeStamp: 0
      }
    },
    mounted() {
      paper.setup('paper-canvas')
      paper.view.viewSize = new Size(this.$el.clientWidth, this.$el.clientWidth)

      // Create a raster item using the image tag with id='mona'
      const raster = new Raster('xiaojing')
      raster.position = paper.view.center
//      raster.setSize(new Size(360, 360))
//      raster.visible = false
//      const gridSize = 12
//      const spacing = 1.5
//
//      for (let y = 0; y < raster.height; y++) {
//        for (let x = 0; x < raster.width; x++) {
//          const color = raster.getPixel(x, y)
//          const center = new Point(new Point(x * gridSize, y * gridSize))
//          const ball = new Ball(center, gridSize / 2 / spacing)
//          ball.draw()
//          ball.shape.scale(color.gray * 2)
//          this.balls.push(ball)
//        }
//      }

      const imageAnchor = new Point(raster.position.x - 180, raster.position.y - 180)
      console.log('imageAnchor', imageAnchor)
      const leftEyeCenter = new Point(imageAnchor.x + 180, imageAnchor.y + 135)
      const leftEye = new Ball(leftEyeCenter, 27)
      leftEye.speed = 0.2
      leftEye.draw()
      this.oldPositionL = leftEyeCenter

      const leftMask = leftEye.shape.clone()

      const tearB = new Ball(new Point(imageAnchor.x + 169, imageAnchor.y + 142), 9)
      tearB.draw()
      tearB.shape.fillColor = 'white'
      const tearS = new Ball(new Point(imageAnchor.x + 185, imageAnchor.y + 152), 5)
      tearS.draw()
      tearS.shape.fillColor = 'white'

      const groupLeftEye = new Group(leftMask, leftEye.shape, tearB.shape, tearS.shape)
      groupLeftEye.clipped = true

      /*****************************************************************************/

      const rightEyeCenter = new Point(imageAnchor.x + 288, imageAnchor.y + 135)
      const rightEye = new Ball(rightEyeCenter, 27)
      rightEye.speed = 0.2
      rightEye.draw()

      const rightMask = rightEye.shape.clone()
      this.oldPositionR = rightEyeCenter

      const tearB1 = new Ball(new Point(imageAnchor.x + 278, imageAnchor.y + 142), 9)
      tearB1.draw()
      tearB1.shape.fillColor = 'white'
      const tearS1 = new Ball(new Point(imageAnchor.x + 294, imageAnchor.y + 152), 5)
      tearS1.draw()
      tearS1.shape.fillColor = 'white'

      const groupRightEye = new Group(rightMask, rightEye.shape, tearB1.shape, tearS1.shape)
      groupRightEye.clipped = true

      paper.view.onFrame = () => {
        this.balls.forEach((ball) => {
          ball.animate()
        })

        leftEye.animate()
        rightEye.animate()
        tearB.animate()
        tearB1.animate()
        tearS.animate()
        tearS1.animate()

        if (Date.now() > this.closeEyeStamp) {
          this.closeEye = true
          this.closeEyeStamp = Date.now() + 1000 * 3
          this.wanderTheta = 0
        }
        if (this.closeEye) {
          const theta = Math.abs(Math.cos(this.wanderTheta))
          leftMask.bounds.height = 54 * Math.max(theta.toFixed(2), 0.01)
          leftMask.position = new Point(this.oldPositionL.x, this.oldPositionL.y)

          rightMask.bounds.height = 54 * Math.max(theta.toFixed(2), 0.01)
          rightMask.position = new Point(this.oldPositionR.x, this.oldPositionR.y)
          this.wanderTheta += Math.PI / 30

          if (this.wanderTheta >= Math.PI) {
            this.closeEye = false
          }
        }
      }
    }
  }
</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss">
  #xiaojing {
    opacity: 0;
  }
</style>
