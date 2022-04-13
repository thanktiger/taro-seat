import { Component } from 'react'
import Taro from '@tarojs/taro'
import { MovableArea, MovableView, Canvas } from '@tarojs/components'
import './index.scss'
import seat from './seat.json'

const CELL_WIDTH = 6
const CELL_HEIGHT = 6
let selectedSeats = {}
const WINDOW_WIDTH = Taro.getSystemInfoSync().windowWidth
export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      seat_width: 0,
      seat_height: 0,
    }
    this.moveX = 0
    this.moveY = 0
    this.seatWith = 20
    this.seatHeight = 20
    this.scale = 1
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    setTimeout(() => {
      Taro.createSelectorQuery()
      .select('#canvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(this.init.bind(this))
    }, 1000);
  }

  init (res) {
    this.canvas = res && res[0].node
    const canvas = this.canvas
    this.ctx = canvas.getContext('2d')
    let seats = seat.map((item, index) => {
      return {
          x: item.x,
          y: item.y,
          status: index % 2 === 0 ? 'Y' : 'N'
      }
    })
    this.avalibleSeats = {}
    let avalibleSeatsTemp = seats.filter((item) => item.status === 'Y')
    avalibleSeatsTemp.forEach(item => this.avalibleSeats[item.x + '_' + item.y] = true)
    

    seats.sort((a, b) => a.x - b.x)
    const max_x = seats[seats.length - 1].x

    seats.sort((a, b) => a.y - b.y)
    const max_y = seats[seats.length - 1].y
    let seat_width = Math.ceil(WINDOW_WIDTH / max_x)
    let seat_height = Math.ceil((WINDOW_WIDTH / 2) / max_y)
    if (!canvas.getContext) return

    this.setState({
      seat_width: seat_width,
      seat_height: seat_height,
    })

    this.draw()
  }

  draw = () => {
    const { seat_width, seat_height } = this.state
    const ctx = this.ctx
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_WIDTH / 2)
    seat.forEach(item => {
      const { x, y, status} = item
        if (status === 'N') {
          ctx.fillStyle = 'gray'
        } else {
          if (selectedSeats[x + '_' + y]) {
            ctx.fillStyle = 'red'
          } else {
            ctx.fillStyle = 'black'
          }
        }
        ctx.fillRect((x - 1) * CELL_WIDTH - this.moveX, (y - 1) * CELL_HEIGHT - this.moveY, Math.ceil(seat_width / 2), Math.ceil(seat_height / 2))
    })
  }

  click = (e) => {
    const x = e.touches[0].x
    const y = e.touches[0].y
    console.log('x is:', x);
    console.log('y is:', y);
    const { seat_width, seat_height } = this.state
    const point = {x: Math.ceil(x / CELL_WIDTH), y: Math.ceil(y / CELL_HEIGHT)}
    let seatPoint = this.avalibleSeats[point.x + '_' + point.y]
    if (seatPoint) {
        this.ctx.clearRect(0, 0, Math.ceil(seat_width / 2), Math.ceil(seat_height / 2))
        selectedSeats[point.x + '_' + point.y] = !selectedSeats[point.x + '_' + point.y]
        this.draw()
    }
}

  onTouchMove = (e) => {
      // 单指操作
      if(e.touches.length == 1) {
        this.moveX = this.toucheX - e.touches[0].x
        this.moveY = this.toucheY - e.touches[0].y
        this.draw()
      } else if (e.touches.length == 2) {
        let _x = e.touches[1].x - e.touches[0].x,
        _y = e.touches[1].y -  e.touches[0].y,
        distance = Math.sqrt(Math.pow(_x, 2) + Math.pow(_y, 2))
        if(this.distance < distance) {
          this.scale += 0.1
        } else if (this.distance > distance) {
          this.scale -= 0.1
        }
        this.draw()
      }
  }

  render () {
    return (
      <MovableArea scaleArea style={{ width: '100%', height: '100vh' }}>
        <MovableView scale outOfBounds style={{ width: WINDOW_WIDTH , height: WINDOW_WIDTH / 2}} direction='all'>
          <Canvas
            type='2d'
            id='canvas'
            onTouchStart={this.click}
            style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH / 2}}
          // onTouchMove={(e) => this.onTouchMove(e)}
          />
        </MovableView>
      </MovableArea>
    )
  }
}
