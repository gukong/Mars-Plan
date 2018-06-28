/**
 * Created by gukong on 2017/7/31.
 */

import paper from 'paper'

const {Shape, Point} = paper

class Ball {
  /**
   * 传入 center 和 radius
   * @param {paper.Point} center
   * @param {number} radius
   */
  constructor(center, radius) {
    this.radius = radius
    this.center = center
    this.shape = null

    this.wanderTheta = 0
    this.vector = new Point(0, 0)
    this.speed = 0.3
    this.distance = 0
    this.returnBack = false

    this.radiationDistance = 100
    this.isRadiating = true
    this.radiationAngle = new Point(this.center.x - paper.view.center.x, this.center.y - paper.view.center.y)
    this.radiationAngle.length = 1
    // this.radiationPoint = null
    this.angle = 0
  }

  draw() {
    this.shape = new Shape.Circle(this.center, this.radius)
    this.shape.fillColor = '#69B0AC'
  }
  animate() {
    this.wanderTheta += Math.PI / 5
    // this.breath()
    this.vibrate(false)
  }
  breath() {
    const theta = Math.cos(this.wanderTheta)
    console.log(theta)
    const radius = 15 * Math.abs(theta)
    const opacity = Math.abs(theta)
    this.shape.radius = radius
    this.shape.opacity = opacity
  }
  vibrate(radiation) {
    if (this.vector.length < this.distance && !this.returnBack) {
      // 远离中心
      this.vector.length += this.speed
    } else if (this.vector.length <= this.speed) {
      // 刷新运动向量
      this.returnBack = false
      const randomX = (0.5 - Math.random()) * 5
      const randomY = (0.5 - Math.random()) * 5
      this.vector = new Point(randomX, randomY)
      this.distance = this.vector.length
      this.vector.length = 0
    } else if (this.returnBack) {
      // 返回中心
      this.vector.length -= this.speed
    } else if (this.vector.length > this.distance) {
      // 离中心太远
      this.returnBack = true
    }

    if (radiation) {
      // 辐射
      const radius = 20 * (Math.cos(this.wanderTheta) + 1)
      this.radiationAngle.length = radius
      const newVector = new Point(this.vector.x + this.radiationAngle.x, this.vector.y + this.radiationAngle.y)

      this.shape.position = new Point(newVector.x + this.center.x, newVector.y + this.center.y)
    } else {
      this.shape.position = new Point(this.vector.x + this.center.x, this.vector.y + this.center.y)
    }
  }
}

export default Ball
