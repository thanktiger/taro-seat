import { Component } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Canvas, Image } from '@tarojs/components'
import './index.scss'
import allSeats from './seats.json'
const seats = allSeats.commonSeats

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      animationData: {}
    }
    this.translateX = 0
    this.translateY = 0
    this.gridX = 30
    this.gridY = 30
    this.seats = {}
    this.transform = {
      translateX: 0,
      translateY: 0,
      scaleX: 1.0,
      scaleY: 1.0
    }
    this.selectedSeats = {}
    for (let index = 0; index < seats.length; index++) {
      let key = seats[index].y + '_' + seats[index].x
      this.seats[key] = {
        col: seats[index].x,
        row: seats[index].y
      }
      
    }
    // this.seats = {
    //   '1_1': {col: 1, row: 1, price: 100},
    //   '3_3': {col: 3, row: 3, price: 200}
    // }
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
    const width = res[0].width
    const height = res[0].height + 100

    const canvas = res[0].node
    this.img = canvas.createImage()
    this.img.src = 'https://bfe.oss-cn-hangzhou.aliyuncs.com/ic_seats_selected.png'
    
    const ctx = canvas.getContext('2d')

    const dpr = wx.getSystemInfoSync().pixelRatio
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    this.ctx = ctx
    this.draw()
  }

  draw = () => {
    let translateX = this.transform.translateX + this.translateX
    let translateY = this.transform.translateY + this.translateY
    let scaleX = this.transform.scaleX
    let scaleY = this.transform.scaleY
    const ctx = this.ctx
    ctx.clearRect(0,0, 400,400)
    ctx.save()
    ctx.translate(translateX, translateY)
    ctx.scale(scaleX, scaleY)
    this.drawSeats()
    ctx.restore()
    ctx.save()
    // ctx.translate()
    // ctx.scale()
    this.drawSeatsPreview()
    ctx.restore()
  }

  drawSeats = () => {
    const ctx = this.ctx
    ctx.fillStyle = 'red'
    for(let key in this.seats) {
      let { row, col } = this.seats[key]
      let x = col*this.gridX
      let y = row*this.gridY
      let w = 0.5*this.gridX
      let h = 0.5*this.gridY
      let r = 4
      let c = '#F1F1F1'
      if (this.selectedSeats[key]) {
        ctx.fillStyle = 'green'
        // let iconX = 160
        // let iconY = 115
        // let iconW = 10
        // let iconH = 7.5
        // ctx.drawImage(this.img, iconX, iconY, iconW, iconH)
      } else {
        ctx.fillStyle = 'red'
      }
      
      // ctx.fillRect(col*this.gridX, row*this.gridY, 0.5*this.gridX, 0.5*this.gridY)
      // ctx.fillRect(x, y, w, h)
      this.drawSingelSeats(x, y, w, h, r, c, 1)
    }
    // for(let row=0; row<10; row++) {
    //   for(let col=0; col<10; col++) {
    //     let key = row+'_'+col
    //     if (this.selectedSeats[key]) {
    //       ctx.fillStyle = 'green'
    //     } else {
    //       ctx.fillStyle = 'red'
    //     }
    //     ctx.fillRect(col*this.gridX, row*this.gridY, 0.5*this.gridX, 0.5*this.gridY)
    //   }
    // }
    
    // ctx.fillStyle = 'green'
    // for(let i=0; i<this.selectedSeats.length; i++) {
    //   let { x, y } = this.selectedSeats[i]
    //   ctx.fillRect(x, y, 0.5, 0.5)
    // }
  }

  drawSingelSeats = (x, y, w, h, r, color, opacity) => {
    const ctx = this.ctx
    ctx.save()
    // ctx.fillRect(w, y, w, h)
    // 开始绘制
    ctx.beginPath()
    ctx.fillStyle =  this.hexToRgba(color, opacity)
    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
    
    // border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y + r)
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
    
    // border-right
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w - r, y + h)
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
    
    // border-bottom
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h - r)
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
    
    // border-left
    ctx.lineTo(x, y + r)
    ctx.lineTo(x + r, y)
    
    ctx.fill()
    ctx.closePath()
    // 剪切
    ctx.clip()
    ctx.restore()
  }

  hexToRgba = (hex, opacity) => {
    return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ',' + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')'
  }

  drawSeatsPreview = () => {

  }

  onTouchStart = (e) => {
    const ctx = this.ctx
    console.log('start:', e)
    this.startX = e.touches[0].x
    this.startY = e.touches[0].y
    this.mode = 'click'
    // console.log('this.startX', this.startX)
    // console.log('this.startY', this.startY)
    // console.log('this.transform.translateX', this.transform.translateX)
    // console.log('this.transform.translateY', this.transform.translateY)
  }

  onTouchMove = (e) => {
    const ctx = this.ctx
    if (e.touches.length === 1) {
      // console.log('e.touches[0].x', e.touches[0].x);
      // console.log('e.touches[0].y', e.touches[0].y);
      this.mode = 'move'
      this.translateX = (e.touches[0].x - this.startX)
      this.translateY = (e.touches[0].y - this.startY)
    }
    this.draw()
  }

  onTouchEnd = (e) => {
    const ctx = this.ctx
    console.log('end:', e)
    if (this.mode === 'click') {
      console.log('startX', this.startX);
      console.log('startY', this.startY);
      let clickX = (this.startX - this.transform.translateX) / this.transform.scaleX
      let clickY = (this.startY - this.transform.translateY) / this.transform.scaleY
      let colIndex = Math.floor(clickX / this.gridX)
      let rowIndex = Math.floor(clickY / this.gridY)
      let key = rowIndex + '_' + colIndex
      if (this.seats[key]) {
        console.log('price is', this.seats[key].price)
        if (!this.selectedSeats[key]) {
          this.selectedSeats[key] = 1
        } else {
          delete this.selectedSeats[key]
        }
        console.log('111', this.selectedSeats)
        this.draw()
      }
    }
    this.startX = 0
    this.startY = 0
    this.transform.translateX += this.translateX
    this.transform.translateY += this.translateY
    this.translateX = 0
    this.translateY = 0
    // console.log('end this.translateX', this.translateX)
    // console.log('end this.translateY', this.translateY)
    // console.log('end this.transform.translateX', this.transform.translateX)
    // console.log('end this.transform.translateY', this.transform.translateY)
  }

  getRelativeCoordinates = (x, y) => {
    return {
      x: (x - this.transform.translateX) / this.transform.scaleX,
      y: (y - this.transform.translateY) / this.transform.scaleY
    }
  }

  render () {
    const { windowWidth } = this.state
    return (
      <View className='wrap'>
        <Canvas
          type='2d'
          id='canvas'
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          style={`width: 400px; height: 400px; background: pink;`}></Canvas>
      </View>
    )
  }
}
