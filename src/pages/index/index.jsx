import { Component } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Canvas, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      animationData: {}
    }
    this.areas = [
      [
          {x: 109.666, y: 182.831},
          {x: 195.87, y: 182.831},
          {x: 195.276, y: 249.415},
          {x: 110.855, y: 252.388},
      ],
      [
          {x: 239.142, y: 182.43},
          {x: 224.287, y: 222.837},
          {x: 305.696, y: 245.418},
          {x: 355.017, y: 218.084},
          {x: 249.244, y: 171.14},
          {x: 243.302, y: 180.053},
      ],
      [
          {x: 240.458, y: 50.82},
          {x: 239.269, y: 156.048},
          {x: 364.71, y: 171.505},
          {x: 368.277, y: 87.08},
      ],
      [
          {x: 78.11, y: 61.8},
          {x: 78.1, y: 165.79},
          {x: 192.79, y: 162.22},
          {x: 189.82, y: 50.512},
      ] 
  ]
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
    console.log('res:', res)
    const canvas = res && res[0].node
    this.ctx = canvas.getContext('2d')
    console.log('ctx:', this.ctx)

    const img = canvas.createImage()
    img.onload = () => {
      this._img = img
    }
    img.src = 'https://img.lengliwh.com/pic/theatre/PXKDEWKJQANG.png'

    this.draw()
  }

  draw = () => {
    const ctx = this.ctx
    ctx.globalCompositeOperation='destination-over'
    // var img = new Image()
    // console.log('img is:', img)
    // img.onload = function(){
    //     ctx.drawImage(img, 0, 0)
    // }
    // img.src = 'https://img.lengliwh.com/pic/theatre/PXKDEWKJQANG.png' // 设置图片源地址
    console.log('ctxctx is', ctx)
    ctx.setStrokeStyle = 'red'
    this.areas.forEach(area => {
        ctx.beginPath();
        area.forEach((item, index) => {
            if (index === 0) {
                ctx.moveTo(item.x, item.y)
            }
            ctx.lineTo(item.x, item.y)
        })
        // ctx.closePath()
        ctx.stroke()
    })
  }

  onClick = (e) => {
    const ctx = this.ctx
    const canvasInfo = this.canvas.getBoundingClientRect()
    const x = e.clientX - canvasInfo.left
    const y = e.clientY - canvasInfo.top
    console.log(ctx.isPointInPath(x, y))
  }

  render () {
    return (
      <View className='wrap'>
        <Canvas type='2d' id='canvas' style='width: 500px; height: 500px;'></Canvas>
      </View>
    )
  }
}
