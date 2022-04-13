import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  constructor(props) {
    super(props)
    // this.state = {
    //   animationData: {}
    // }
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
  this.canvasbgPath = []
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    let promiseDatas = []
    let p =  new Promise((resolve, reject) => {
      Taro.getImageInfo({ src: 'https://img.lengliwh.com/pic/theatre/PXKDEWKJQANG.png' }).then(res => {
        if (res.path) {
          resolve({ backgroundImge: res.path })
        } else {
          reject('error')
        }
      })
    })
    promiseDatas.push(p)
    Promise.all(promiseDatas).then(res => {
      let data = {}
      res.forEach(item => {
        Object.assign(data, item)
      })
      this.canvasbgPath = data
      this.draw()
    })
  }

  draw = () => {
    const ctx = Taro.createCanvasContext('drawCanvas')
    let images = this.canvasbgPath

    if (images.backgroundImge) {
      ctx.drawImage(images.backgroundImge, 0, 0)
    }
      ctx.setStrokeStyle('red')
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
      ctx.draw()
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
        <Canvas canvasId='drawCanvas' style='width: 500px; height: 500px;'></Canvas>
      </View>
    )
  }
}
