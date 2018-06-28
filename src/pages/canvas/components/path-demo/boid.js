/**
 * Created by gukong on 2017/8/13.
 */
import paper from 'paper'
const {Point, Path, Shape} = paper

class Boid {
  constructor(position, maxSpeed) {
    const strength = Math.random() * 0.5
    this.vector = Point.random().multiply(2).subtract(1)
    this.position = position.clone()
    this.radius = 30
    this.maxSpeed = maxSpeed + strength
    this.amount = strength * 10 + 10
    this.count = 0
    this.createItems()
  }

  run() {
    this.lastLoc = this.position.clone()
    this.borders()
    this.update()
    this.calculateTail()
    this.moveHead()
  }

  calculateTail() {
    const segments = this.path.segments
    const shortSegments = this.shortPath.segments
    const speed = this.vector.length
    const pieceLength = 5 + speed / 3
    let point = this.lastLoc
    segments[0].point = shortSegments[0].point = point
    // Chain goes the other way than the movement
    let lastVector = this.vector.multiply(-1)
    for (let i = 1; i < this.amount; i++) {
      const vector = segments[i].point.subtract(point)
      this.count += speed * 10
      const wave = Math.sin((this.count + i * 3) / 300)
      const sway = lastVector.rotate(90).normalize(wave)

      point = lastVector.normalize(pieceLength).add(point).add(sway)
      segments[i].point = point
      if (i < 3) {
        shortSegments[i].point = point
      }
      lastVector = vector
    }
    this.path.smooth()
  }

  createItems() {
    this.head = new Shape.Ellipse({
      center: [0, 0],
      size: [13, 8],
      fillColor: 'red'
    })

    this.path = new Path({
      strokeColor: 'red',
      strokeWidth: 2,
      strokeCap: 'round'
    })
    for (let i = 0; i < this.amount; i++) {
      this.path.add(new Point())
    }

    this.shortPath = new Path({
      strokeColor: 'red',
      strokeWidth: 4,
      strokeCap: 'round'
    })
    for (let i = 0; i < Math.min(3, this.amount); i++) {
      this.shortPath.add(new Point())
    }
  }

  moveHead() {
    this.head.position = this.position
    this.head.rotation = this.vector.angle
  }

  update() {
    this.vector.length = Math.min(this.maxSpeed, this.vector.length)
    this.position = this.position.add(this.vector)
  }

  borders() {
    const vector = new Point()
    const position = this.position
    const radius = this.radius
    const size = paper.view.size
    if (position.x < -radius) vector.x = size.width + radius
    if (position.y < -radius) vector.y = size.height + radius
    if (position.x > size.width + radius) vector.x = -size.width - radius
    if (position.y > size.height + radius) vector.y = -size.height - radius
    if (!vector.isZero()) {
      this.position = this.position.add(vector)
      const segments = this.path.segments
      for (let i = 0; i < this.amount; i++) {
        segments[i].point = segments[i].point.add(vector)
      }
    }
  }
}
export default Boid
