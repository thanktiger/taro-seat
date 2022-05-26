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
    this.starCurIndex = 0
    this.updateAngle = 180
    this.state = {
      canvasWidth: 0,
      canvasHeight: 0,
      stars: [
        {
          icon:'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_1.png',
          code: 1,
          img: {},
          name: '光环世界',
          enName: 'HALO',
          age: 1,
          landColor: '#ff0000',
          desc: `哈哈哈哈哈哈哈\n呵呵呵呵呵呵呵\n嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿`,
          fragmentCount: 32,
          userCount: 4
        },
        {
          icon:'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_2.png',
          code: 2,
          img: {},
          name: '光环世界',
          enName: 'HALO',
          age: 1,
          landColor: '#ff0000',
          desc: `哈哈哈哈哈哈哈\n呵呵呵呵呵呵呵\n嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿`,
          fragmentCount: 32,
          userCount: 4
        },
        {
          icon:'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_3.png',
          code: 3,
          img: {},
          name: '光环世界',
          enName: 'HALO',
          age: 1,
          landColor: '#ff0000',
          desc: `哈哈哈哈哈哈哈\n呵呵呵呵呵呵呵\n嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿`,
          fragmentCount: 32,
          userCount: 4
        },
        {
          icon:'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_4.png',
          code: 4,
          img: {},
          name: '光环世界',
          enName: 'HALO',
          age: 1,
          landColor: '#ff0000',
          desc: `哈哈哈哈哈哈哈\n呵呵呵呵呵呵呵\n嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿`,
          fragmentCount: 32,
          userCount: 4
        },
        {
          icon:'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_5.png',
          code: 5,
          img: {},
          name: '光环世界',
          enName: 'HALO',
          age: 1,
          landColor: '#ff0000',
          desc: `哈哈哈哈哈哈哈\n呵呵呵呵呵呵呵\n嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿`,
          fragmentCount: 32,
          userCount: 4
        },
        {
          icon:'https://bfe.oss-cn-hangzhou.aliyuncs.com/pic_number_star_6.png',
          code: 6,
          img: {},
          name: '光环世界',
          enName: 'HALO',
          age: 1,
          landColor: '#ff0000',
          desc: `哈哈哈哈哈哈哈\n呵呵呵呵呵呵呵\n嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿`,
          fragmentCount: 32,
          userCount: 4
        },
      ]
    }
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    let { stars } = this.state
    let promises = []
    stars.forEach(star => {
      let p = Taro.getImageInfo({
        src: star.icon,
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
        this.onInitialAnimation()
      }, 500);
    })
  }

  onInitialAnimation = () => {
    let targetAngle = 0
    this.count = 0
    this.animationStartAngle = this.updateAngle
    this.distance = targetAngle - this.animationStartAngle
    this.speed = this.distance / 60
    
    this.canvas.requestAnimationFrame(() => {
      this.initialAnimationPlay()
    })
  }

  initialAnimationPlay = () => {
    this.count++
    let curTarget = this.speed * this.count + this.animationStartAngle
    if (this.count > this.distance / this.speed) {
      this.updateAngle = 0
      this.animationInited = true
      this.draw()
    } else {
      this.updateAngle = curTarget
      this.draw()
      this.canvas.requestAnimationFrame(() => {
        this.initialAnimationPlay()
      })
    }
  }

  draw = () => {
    const { canvasWidth, canvasHeight } = this.state
    const ctx = this.ctx
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.save()
    let updateAngle = this.updateAngle || 0
    let starArray = this.animationInited ? this.getStarsWithCurStarIndex() : this.getInitialStars()
    for (let i=0; i<starArray.length; i++) {
      let angle = starArray[i].angle + updateAngle + 360
      angle = angle % 360
      this.drawStar(angle, starArray[i])
    }
    if (this.animationInited) {
      this.drawTextInfo()
      this.drawArrow()
      this.drawStarTrack()
    }
    ctx.restore()
  }

  // 星球
  drawStar = (angle, starInfo) => {
    let ctx = this.ctx
    let starRadius = 340
    let {scale, x, y} = this.getStarInfo(angle)
    ctx.save()
    ctx.beginPath()
    ctx.translate(x, y)
    ctx.scale(scale, scale)
    ctx.drawImage(starInfo.image, 0, 0, starRadius, starRadius)
    ctx.restore()
  }

  // 星球文案
  drawTextInfo = () => {
    let { angle, index, offsetPercentage } = this.getStarIndexWithAngle()
    let starInfo = this.state.stars[index]
    // if (this.updateAngle%60 === 0) {
    //   console.log('angle', angle, 'index', index, 'starInfo', starInfo);
    // }
    let { code, name, enName, age, landColor, desc } = starInfo
    let alpha = (1 - offsetPercentage)*0.9 + 0.1
    let yOffset = offsetPercentage*20
    let isLogined = false
    let ctx = this.ctx
    const alpha054 = 0.54
    const alpha087 = 0.87
    const white = `rgba(255,255,255,${alpha})`
    const white054 = `rgba(255,255,255,${alpha > alpha054 ? alpha054 : alpha})`
    const white087 = `rgba(255,255,255,${alpha > alpha087 ? alpha087 : alpha})`
    ctx.textBaseline = 'top'
    ctx.save()
    ctx.translate(24, yOffset)
    // 英文名
    ctx.translate(0, 412.5)
    ctx.save()
      ctx.font = `normal 700 ${28}px PingFang SC`
      ctx.fillStyle = white
      ctx.fillText(`0${code} ${enName}`, 0, 0)
    ctx.restore()
    // 中文名
    ctx.translate(0, 36)
    ctx.save()
      ctx.font = `normal 600 ${28}px PingFang SC`
      ctx.fillStyle = white
      ctx.fillText(name, 0, 0)
    ctx.restore()

    // 是否登录标签
    ctx.translate(0, 43.5)
    ctx.save()
      if (isLogined) {
        ctx.fillStyle = `rgba(239,179,3,${alpha})`
        ctx.fillRect(0, 0, 56, 24)
      } else {
        ctx.strokeStyle = white
        ctx.strokeRect(0, 0, 56, 24)
      }
      ctx.save()
      ctx.translate(28, 12)
      ctx.font = 'normal 500 14px PingFang SC'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      if (isLogined) {
        ctx.fillStyle = white
        ctx.fillText('已登录', 0, 0)
      } else {
        ctx.fillStyle = white
        ctx.fillText('未登录', 0, 0)
      }
      ctx.restore()
    ctx.restore()
      
    // 已登录和未登录的展示信息
    const statusInfo = {
      loginTime: '2022 / 03 / 10',
      fragmentCount: 32,
      taskCount: 4,
      age,
      code,
      userCount: 12
    }
    this.drawStatusInfo(isLogined, statusInfo, white054, white)
    this.drawDesc(white087)
    ctx.restore()
  }

  // 状态文案
  drawStatusInfo = (isLogined, statusInfo, white054, white) => {
    const { loginTime, fragmentCount, taskCount = 4, userCount, age, code } = statusInfo
    const info = {}
    let isLoginedList = [
      {text: '上次登录时间：', value: loginTime, x: 100},
      {text: '已收集碎片数：', value: fragmentCount, x: 100},
      {text: '已完成任务数：', value: taskCount, x: 100}
    ]
    let isUnLoginList = [
      {text: `${code} 号星球的年龄：`, value: age, x: 110.5},
      {text: '已登陆的旅行者：', value: userCount, x: 114},
      {text: '星球碎片累计总数：', value: fragmentCount, x: 128}
    ]
    if (isLogined) {
      info.loginTime = '2022 / 03 / 10'
      info.fragmentCount = 32
      info.taskCount = taskCount
    } else {
      info.age = age
      info.userCount = userCount
      info.fragmentCount = fragmentCount
    }
    let ctx = this.ctx
    ctx.translate(0, 21)
    const list = isLogined ? isLoginedList : isUnLoginList
    list.map((item, index) => {
      let { text, value, x } = item
      ctx.translate(0, 22)
      ctx.save()
        ctx.font = 'normal 400 14px PingFang SC'
        ctx.fillStyle = white054
        ctx.fillText(text, 0, 0)
  
        ctx.translate(x, 0)
        ctx.font = 'normal 500 14px PingFang SC'
        ctx.fillStyle = white
        ctx.fillText(value, 0, 0)
      ctx.restore()
    })
  }

  // 描述文案
  drawDesc = (white087) => {
    const desc = `亚特兰蒂斯、阿瓦隆、庞贝古城……\n从一杯充满花果香气的咖啡里\n品味、聆听、阅读、感受、想象\n1 号闪耀人类文明之光的星球`
    const descList = desc.split('\n')
    let ctx = this.ctx
    ctx.translate(0, 8)
    for (let i = 0; i < descList.length; i++) {
      const desc = descList[i];
      ctx.translate(0, 22)
      ctx.save()
        ctx.font = 'normal 400 16px PingFang SC'
        ctx.fillStyle = white087
        ctx.fillText(desc, 0, 0)
      ctx.restore()
    }
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

  getStarsWithCurStarIndex = () => {
    
    let { stars } = this.state
    const starLength = stars.length

    let rtn = []
    for(let i=0; i<5; i++) {
      // 从数组的-1到第四张 （1,2,3,4,6）
      let starPosIndex = (i-1 + this.starCurIndex)%starLength
      if (starPosIndex < 0) starPosIndex = starLength + starPosIndex
      // console.log('starPosIndex is', starPosIndex)
      let angle = (i-1)*60
      if (angle < 0) angle += 360
      let starInfo = {
        image: this['star' + starPosIndex], 
        starIndex: stars[starPosIndex].code,
        angle
      }
      rtn.push(starInfo)
    }
    return rtn
  }

  getInitialStars = () => {
    let { stars } = this.state
    let rtn = []
    for(let i=0; i<3; i++) {
      let starPosIndex = i
      let angle = i*60
      let starInfo = {
        image: this['star' + starPosIndex], 
        starIndex: stars[starPosIndex].code,
        angle
      }
      rtn.push(starInfo)
    }
    return rtn
  }

  getStarInfoByIndex = (index) => {
    let { stars } = this.state
    const starLength = stars.length
    let starPosIndex = index%starLength
    if (starPosIndex < 0) starPosIndex = starLength + starPosIndex
    return stars[starPosIndex]
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
    this.count = 0
    this.animationStartAngle = this.updateAngle
    this.distance = targetAngle - this.animationStartAngle
    this.speed = this.distance / 15
    this.indexBound = this.state.stars.length
    
    this.canvas.requestAnimationFrame(() => {
      this.animationPlay()
    })
  }

  getStarIndexWithAngle = () => {
    let updateAngle = this.updateAngle > 0 ? this.updateAngle : -this.updateAngle
    let triggerAngle = updateAngle%60 > 30
    let targetAngle = updateAngle-(updateAngle%60)
    let offsetPercentage = updateAngle%60 / 30
    if (triggerAngle) {
      targetAngle = updateAngle-(updateAngle%60)+60
      offsetPercentage = (60 - updateAngle%60) / 30
    }
    if (this.updateAngle < 0) {
      targetAngle = -targetAngle
    }

    let targetIndex = this.starCurIndex - targetAngle / 60

    let { stars } = this.state
    const starLength = stars.length
    let starPosIndex = targetIndex%starLength
    if (starPosIndex < 0) starPosIndex = starLength + starPosIndex

    return {
      angle: targetAngle,
      offsetPercentage,
      index: starPosIndex
    }
  }

  animationPlay = () => {
    this.count++
    let curTarget = this.speed * this.count + this.animationStartAngle
    if (this.count > this.distance / this.speed) {
      let targetAngle = this.distance + this.animationStartAngle
      this.starCurIndex += -targetAngle/60
      this.starCurIndex %= this.indexBound
      this.updateAngle = 0
      this.getStarsWithCurStarIndex()
      this.draw()
    } else {
      this.updateAngle = curTarget
      this.draw()
      this.canvas.requestAnimationFrame(() => {
        this.animationPlay()
      })
    }
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
