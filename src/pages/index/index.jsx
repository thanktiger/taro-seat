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

  componentDidHide () { }

  render () {
    return (
      <View className='wrap'>1</View>
    )
  }
}
