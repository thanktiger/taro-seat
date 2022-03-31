import { Component } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      animationData: {}
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    })

    this.animation = animation
  }

  componentDidHide () { }

  render () {
    return (
      <View className='wrap' />
    )
  }
}
