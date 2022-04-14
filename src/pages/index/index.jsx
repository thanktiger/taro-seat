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
        { x: 109.666, y: 182.831 },
        { x: 195.87, y: 182.831 },
        { x: 195.276, y: 249.415 },
        { x: 110.855, y: 252.388 },
      ],
      [
        { x: 239.142, y: 182.43 },
        { x: 224.287, y: 222.837 },
        { x: 305.696, y: 245.418 },
        { x: 355.017, y: 218.084 },
        { x: 249.244, y: 171.14 },
        { x: 243.302, y: 180.053 },
      ],
      [
        { x: 240.458, y: 50.82 },
        { x: 239.269, y: 156.048 },
        { x: 364.71, y: 171.505 },
        { x: 368.277, y: 87.08 },
      ],
      [
        { x: 78.11, y: 61.8 },
        { x: 78.1, y: 165.79 },
        { x: 192.79, y: 162.22 },
        { x: 189.82, y: 50.512 },
      ],
      [
        { x: 154, y: 273 },
        { x: 160, y: 332.22 },
        { x: 242, y: 339.59 },
        { x: 264, y: 276.46 },
      ],
    ];
    this.canvasbgPath = []
    this.touches = { x: 0, y: 0 }
  }

  componentWillMount() {}

  componentDidMount() {
    let promiseDatas = [];
    let p = new Promise((resolve, reject) => {
      Taro.getImageInfo({
        src: "https://img.lengliwh.com/pic/theatre/PXKDEWKJQANG.png",
      }).then((res) => {
        if (res.path) {
          resolve({ backgroundImge: res.path });
        } else {
          reject("error")
        }
      });
    });
    promiseDatas.push(p);
    Promise.all(promiseDatas).then((res) => {
      let data = {}
      res.forEach((item) => {
        Object.assign(data, item)
      });
      this.canvasbgPath = data
      this.draw()
    });
  }

  draw = () => {
    const ctx = Taro.createCanvasContext("drawCanvas");
    this.ctx = ctx;
    let images = this.canvasbgPath

    if (images.backgroundImge) {
      ctx.drawImage(images.backgroundImge, 0, 0)
    }

    ctx.setStrokeStyle("red");
    this.areas.forEach((area) => {
      ctx.beginPath()
      area.forEach((item, index) => {
        if (index === 0) {
          ctx.moveTo(item.x, item.y);
        }
        ctx.lineTo(item.x, item.y);
      });
      ctx.closePath()
      ctx.stroke()
    });
    ctx.draw()
  };

  judge(dot, coordinates, noneZeroMode) {
    // 默认启动none zero mode
    noneZeroMode = noneZeroMode || 1
    var x = dot.x,
      y = dot.y
    var crossNum = 0
    // 点在线段的左侧数目
    var leftCount = 0
    // 点在线段的右侧数目
    var rightCount = 0
    for (var i = 0; i < coordinates.length - 1; i++) {
      var start = coordinates[i]
      var end = coordinates[i + 1]

      // 起点、终点斜率不存在的情况
      if (start.x === end.x) {
        // 因为射线向右水平，此处说明不相交
        if (x > start.x) continue;

        // 从左侧贯穿
        if (end.y > start.y && y >= start.y && y <= end.y) {
          leftCount++
          crossNum++
        }
        // 从右侧贯穿
        if (end.y < start.y && y >= end.y && y <= start.y) {
          rightCount++
          crossNum++
        }
        continue
      }
      // 斜率存在的情况，计算斜率
      var k = (end.y - start.y) / (end.x - start.x);
      // 交点的x坐标
      var x0 = (y - start.y) / k + start.x;
      // 因为射线向右水平，此处说明不相交
      if (x > x0) continue

      if (end.x > start.x && x0 >= start.x && x0 <= end.x) {
        crossNum++
        if (k >= 0) leftCount++
        else rightCount++
      }
      if (end.x < start.x && x0 >= end.x && x0 <= start.x) {
        crossNum++
        if (k >= 0) rightCount++
        else leftCount++
      }
    }

    return noneZeroMode === 1
      ? leftCount - rightCount !== 0
      : crossNum % 2 === 1;
  }

  onClick = (e) => {
    this.touches = { x: e.touches[0].x, y: e.touches[0].y }
    this.areas.forEach((area, index) => {
      let isSide = this.judge(
        { x: e.touches[0].x, y: e.touches[0].y },
        area
      )
      if (isSide) {
        console.log("area is", index + 1)
      }
    })

    this.draw()
  }

  render() {
    return (
      <View className='wrap'>
        <Canvas
          canvasId='drawCanvas'
          style='width: 500px; height: 500px;'
          onTouchStart={this.onClick}
        ></Canvas>
      </View>
    );
  }
}
