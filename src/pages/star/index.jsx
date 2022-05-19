import { Component } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Canvas, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.translateX = 0
    this.translateY = 0
    this.scaleX = 1.0
    this.scaleY = 1.0
    this.transform = {
      translateX: 0,
      translateY: 0,
      scaleX: 1.0,
      scaleY: 1.0
    }
    this.starsPath = []
    this.state = {
      canvasWidth: 0,
      canvasHeight: 0,
      stars: [
        'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_1.png',
        'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_2.png',
        'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_3.png',
        'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_4.png',
        'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_5.png',
        'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_6.png',
      ]
    }
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    let { stars } = this.state
    let promises = []
    stars.forEach(image => {
      let p = Taro.getImageInfo({
        src: image,
      }).then(res => res && res.path)
      promises.push(p)
    })
    Promise.all(promises).then(result => {
      this.starsPath = result
    })
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
    const { screenWidth, screenHeight, pixelRatio } = wx.getSystemInfoSync()
    const canvas = res[0].node
    this.canvas = canvas
    for (let i = 0; i < this.starsPath.length; i++) {
      this['star' + i] = this.canvas.createImage()
      this['star' + i].src= this.starsPath[i]
    }
    this.arrow = this.canvas.createImage()
    const ctx = canvas.getContext('2d')
    this.ctx = ctx
    const dpr = wx.getSystemInfoSync().pixelRatio
    this.setState({
      canvasWidth: screenWidth,
      canvasHeight: screenHeight,
    }, () => {
      canvas.width = screenWidth * dpr
      canvas.height = screenHeight * dpr
      ctx.scale(dpr, dpr)
      setTimeout(() => {
        this.draw()
      }, 500);
    })
  }

  draw = () => {
    const { canvasWidth, canvasHeight, stars } = this.state
    const ctx = this.ctx
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.save()
    let updateAngle = this.updateAngle || 0
    let averageAngle = 360 / stars.length
    let angles = []
    for (let i = 0; i < stars.length; i++) {
      angles.push(averageAngle*i)
    }
    for (let i=0; i<angles.length; i++) {
      let angle = angles[i] + updateAngle + 360
      angle = angle % 360
      this.drawStar(angle, i)
    }
    this.drawTextInfo()
    this.drawArrow()
    this.drawStarTrack()
    ctx.restore()
  }

  // 星球
  drawStar = (angle, i) => {
    let ctx = this.ctx
    let starRadius = 340
    let {scale, x, y} = this.getStarInfo(angle)
    ctx.save()
    ctx.beginPath()
    ctx.translate(x, y)
    ctx.scale(scale, scale)
    ctx.drawImage(this['star'+i], 0, 0, starRadius, starRadius)
    ctx.restore()
  }

  // 星球文案
  drawTextInfo = () => {
    let number = 1
    let eName = 'HALO'
    let cName = '光环世界'
    let isLogin = true
    let ctx = this.ctx
    ctx.save()
    // 英文名
    ctx.translate(24, 406)
    ctx.font = `${28}px PingFang SC`
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText(`0${number} ${eName}`, 0, 0)

    // 中文名
    ctx.translate(0, 40)
    ctx.font = `${28}px PingFang SC`
    ctx.fillText(cName, 0, 0)

    // 是否登录标签
    ctx.save()
    ctx.translate(0, 15)
    if (isLogin) {
      ctx.fillStyle = '#EFB303'
      ctx.fillRect(0, 0, 56, 24)
    } else {
      ctx.strokeStyle = 'rgba(255,255,255,0.87)'
      ctx.strokeRect(0, 0, 56, 24)
    }
    ctx.translate(28, 12)
    ctx.font = '14px PingFang SC'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if (isLogin) {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText('已登录', 0, 0)
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.87)'
      ctx.fillText('未登录', 0, 0)
    }
    ctx.restore()
    ctx.restore()
  }

  // 轨道
  drawStarTrack = () => {
    let ctx = this.ctx
    ctx.save()
    ctx.beginPath()
    for (let i = 0; i < this.stars.length; i++) {
      ctx.lineTo(this.stars[i].x, this.stars[i].y);
    }
    ctx.closePath()
    ctx.strokeStyle = '#333333'
    ctx.stroke()
    ctx.restore()
  }

  // 星球所对应的系数
  getStarInfo = (angle) => {
    let stars = [
      {
        angle: 0,
        scale: 1,
        x: 168 / 2,
        y: 548 / 2
      },
      {
        angle: 60,
        scale: 0.45,
        x: 20 / 2,
        y: 260 / 2
      },
      {
        angle: 120,
        scale: 0.25,
        x: 420 / 2,
        y: 160 / 2
      },
      {
        angle: 180,
        scale: 0.2,
        x: this.state.canvasWidth,
        y: 112 / 2
      },
      {
        angle: 240,
        scale: 0.3,
        x: 850 / 2,
        y: 260 / 2
      },
      {
        angle: 300,
        scale: 1.2,
        x: this.state.canvasWidth,
        y: 548 / 2
      },
    ]
    this.stars = stars
    let scale, x, y, i
    if (angle >= stars[0].angle && angle < stars[1].angle) {
      i = 0
    } else if (angle >= stars[1].angle && angle < stars[2].angle) {
      i = 1
    } else if (angle >= stars[2].angle && angle < stars[3].angle) {
      i = 2
    } else if (angle >= stars[3].angle && angle < stars[4].angle) {
      i = 3
    } else if (angle >= stars[4].angle && angle < stars[5].angle) {
      i = 4
    } else if (angle >= stars[5].angle && angle <= stars[0].angle + 360) {
      i = 5
    }
    // 最后一个
    if (i === stars.length-1) {
      scale = (stars[0].scale - stars[i].scale) / (stars[0].angle + 360 - stars[i].angle) * (angle - stars[i].angle) + stars[i].scale
      x = (stars[0].x - stars[i].x) / (stars[0].angle + 360 - stars[i].angle) * (angle - stars[i].angle) + stars[i].x
      y = (stars[0].y - stars[i].y) / (stars[0].angle + 360 - stars[i].angle) * (angle - stars[i].angle) + stars[i].y
    } else {
      scale = (stars[i+1].scale - stars[i].scale) / (stars[i+1].angle - stars[i].angle) * (angle - stars[i].angle) + stars[i].scale
      x = (stars[i+1].x - stars[i].x) / (stars[i+1].angle - stars[i].angle) * (angle - stars[i].angle) + stars[i].x
      y = (stars[i+1].y - stars[i].y) / (stars[i+1].angle - stars[i].angle) * (angle - stars[i].angle) + stars[i].y
    }
    
    return {
      scale, x ,y
    }
  }

  // 底部箭头
  drawArrow = () => {
    const { canvasWidth, canvasHeight } = this.state
    let iconWidth = 56
    let ctx = this.ctx
    if (!this.arrow.src) {
      Taro.getImageInfo({
        src: 'https://bfe.oss-cn-hangzhou.aliyuncs.com/ic_number_star_arrow.png',
        success: (res) => {
          this.arrow.src = res.path
          this.arrow.onload = () => {
            ctx.drawImage(this.arrow, canvasWidth/2-iconWidth/2, canvasHeight-(iconWidth+34), iconWidth, iconWidth)
          }
        }
      })
    } else {
      ctx.drawImage(this.arrow, canvasWidth/2-iconWidth/2, canvasHeight-(iconWidth+34), iconWidth, iconWidth)
    }
  }

  onTouchStart = (e) => {
    const ctx = this.ctx
    if (e.touches.length === 1) {
      this.startX = e.touches[0].x
      this.startY = e.touches[0].y
      this.mode = 'click'
    }
  }

  onTouchMove = (e) => {
    const ctx = this.ctx
    if (e.touches.length === 1) {
      // 忽略不正确的mode 为了防止手指数量变化
      if (this.mode !== 'click' && this.mode !== 'pan') return
      // console.log('e.touches[0].x', e.touches[0].x);
      // console.log('e.touches[0].y', e.touches[0].y);
      let moveX = (e.touches[0].x - this.startX)
      let moveY = (e.touches[0].y - this.startY)
      this.onPaning(moveX, moveY, e.touches[0].x, e.touches[0].y)
      
    }
  }

  onTouchEnd = (e) => {
    const ctx = this.ctx
    if (this.mode === 'click') {
      this.onClick()
    } else {
      let updateAngle = this.updateAngle > 0 ? this.updateAngle : -this.updateAngle
      let triggerAngle = updateAngle%60 > 30
      let targetAngle = updateAngle-(updateAngle%60)
      if (triggerAngle) {
        targetAngle = updateAngle-(updateAngle%60)+60
        this.transform = this.getCurCombinedTransform()
      }
      if (this.updateAngle < 0) {
        targetAngle = -targetAngle
      }
      this.onAnimation(targetAngle)
    }
    
    // 重新初始化参数
    this.startX = 0
    this.startY = 0
    this.translateX = 0
    this.translateY = 0
    this.scaleX = 1.0
    this.scaleY = 1.0
    this.mode = undefined
    
  }

  onAnimation = (targetAngle) => {
    let angleList = []
    if (this.updateAngle < targetAngle) {
      for (let i = this.updateAngle; i < targetAngle; i++) {
        angleList.push(Math.ceil(i))
      }
    } else {
      for (let i = this.updateAngle; i > targetAngle; i--) {
        angleList.push(Math.floor(i))
      }
    }
    angleList.forEach((item, index) => setTimeout(() => {
      this.updateAngle = item
      this.draw()
    }, index*5))
  }

  onPaning = (moveX, moveY) => {
    this.mode = 'pan'
    this.translateX = -moveX
    this.translateY = -moveY
    let translateX = this.translateX + this.transform.translateX
    this.updateAngle = (30 * (translateX / 100))%360
    this.draw()
  }

  onClick = () => {
    console.log('startX', this.startX);
    console.log('startY', this.startY);
  }

  getCurCombinedTransform = (inputTransform) => {
    let scaleX, scaleY, translateX, translateY
    if (inputTransform) {
      // 如果传入了则用构造的transform去计算
      scaleX = this.transform.scaleX*inputTransform.scaleX
      scaleY = this.transform.scaleY*inputTransform.scaleY
      translateX = inputTransform.translateX + this.transform.translateX*inputTransform.scaleX
      translateY = inputTransform.translateY + this.transform.translateY*inputTransform.scaleY
    } else {
      // 未传入则用this中记录的根据touchMove计算的临时transform值
      scaleX = this.transform.scaleX*this.scaleX
      scaleY = this.transform.scaleY*this.scaleY
      translateX = this.translateX + this.transform.translateX*this.scaleX
      translateY = this.translateY + this.transform.translateY*this.scaleY
    }
    return { scaleX, scaleY, translateX, translateY }
  }

  getAbsoluteCoordinates = (x, y, inputTransform) => {
    let { scaleX, scaleY, translateX, translateY } = inputTransform || this.getCurCombinedTransform()
    // 等同于 求出 A*x, A为transform, x为相对坐标系中的坐标
    return {
      x: x*scaleX + translateX,
      y: y*scaleY + translateY
    }
  }

  getRelativeCoordinates = (x, y, inputTransform) => {
    let { scaleX, scaleY, translateX, translateY } = inputTransform || this.getCurCombinedTransform()
    // 等同于 求出Inv(A)*y, Inv(A)为变换矩阵的逆，y为绝对坐标系中的坐标
    return {
      x: (x - translateX) / scaleX,
      y: (y - translateY) / scaleY
    }
  }

  render () {
    const { canvasWidth, canvasHeight } = this.state
    return (
      <View className='wrap'>
        <Canvas
          type='2d'
          id='canvas'
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          style={`width: ${canvasWidth}px; height: ${canvasHeight}px; background: transparent;`}></Canvas>
        <Image className='bgImage' src='https://saturnbird.oss-cn-hangzhou.aliyuncs.com/starry-night.gif' />
      </View>
    )
  }
}
